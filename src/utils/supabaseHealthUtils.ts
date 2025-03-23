
import { supabase } from '@/integrations/supabase/client';
import { formatDate, type HealthData } from './healthUtils';

// Fetch all health data for the logged-in user
export const fetchUserHealthData = async (): Promise<HealthData | null> => {
  try {
    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Fetch sleep data
    const { data: sleepData, error: sleepError } = await supabase
      .from('sleep_data')
      .select('*')
      .order('time', { ascending: false });
    
    if (sleepError) {
      console.error('Error fetching sleep data:', sleepError);
      throw sleepError;
    }

    // Fetch activity data
    const { data: activityData, error: activityError } = await supabase
      .from('activity_data')
      .select('*')
      .order('time', { ascending: false });
    
    if (activityError) {
      console.error('Error fetching activity data:', activityError);
      throw activityError;
    }

    // Fetch diet data
    const { data: dietData, error: dietError } = await supabase
      .from('diet_data')
      .select('*')
      .order('time', { ascending: false });
    
    if (dietError) {
      console.error('Error fetching diet data:', dietError);
      throw dietError;
    }

    // Fetch stress data
    const { data: stressData, error: stressError } = await supabase
      .from('stress_data')
      .select('*')
      .order('time', { ascending: false });
    
    if (stressError) {
      console.error('Error fetching stress data:', stressError);
      throw stressError;
    }

    // Transform data to match HealthData format
    const transformedData: HealthData = {
      sleep: sleepData.map(item => ({
        hours: Number(item.hours),
        quality: item.quality,
        time: new Date(item.time)
      })),
      activity: activityData.map(item => ({
        minutes: item.minutes,
        intensity: item.intensity,
        type: item.type || '',
        time: new Date(item.time)
      })),
      diet: dietData.map(item => {
        // Group diet entries by date
        const date = formatDate(new Date(item.time), 'short');
        return {
          meals: [
            {
              name: item.meal_name || 'Meal',
              quality: item.quality,
              time: new Date(item.time)
            }
          ],
          water: item.water || 0,
          time: new Date(item.time)
        };
      }),
      stress: stressData.map(item => ({
        level: item.level,
        notes: item.notes || '',
        time: new Date(item.time)
      }))
    };

    return transformedData;
  } catch (error) {
    console.error('Error fetching health data:', error);
    return null;
  }
};

// Add a new health metric
export const addHealthMetric = async (
  category: 'sleep' | 'activity' | 'diet' | 'stress',
  data: any
): Promise<boolean> => {
  try {
    let result;

    switch (category) {
      case 'sleep':
        result = await supabase
          .from('sleep_data')
          .insert({
            hours: data.hours,
            quality: data.quality || 5,
            time: data.time || new Date()
          });
        break;
        
      case 'activity':
        result = await supabase
          .from('activity_data')
          .insert({
            minutes: data.minutes,
            intensity: data.intensity || 5,
            type: data.type || 'walking',
            time: data.time || new Date()
          });
        break;
        
      case 'diet':
        result = await supabase
          .from('diet_data')
          .insert({
            meal_name: data.meal_name,
            quality: data.quality,
            water: data.water,
            time: data.time || new Date()
          });
        break;
        
      case 'stress':
        result = await supabase
          .from('stress_data')
          .insert({
            level: data.level,
            notes: data.notes || '',
            time: data.time || new Date()
          });
        break;
        
      default:
        return false;
    }

    if (result.error) {
      console.error(`Error adding ${category} data:`, result.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error adding health metric:', error);
    return false;
  }
};
