
// Define types for health data
export type HealthData = {
  sleep: {
    hours: number;
    quality: number; // 1-10
    time: Date;
  }[];
  activity: {
    minutes: number;
    intensity: number; // 1-10
    type: string;
    time: Date;
  }[];
  diet: {
    meals: {
      name: string;
      quality: number; // 1-10
      time: Date;
    }[];
    water: number; // glasses
    time: Date;
  }[];
  stress: {
    level: number; // 1-10
    notes: string;
    time: Date;
  }[];
};

// Filter data by date range
export const filterDataByDateRange = (
  data: any[],
  startDate: Date,
  endDate: Date
): any[] => {
  return data.filter(
    item => {
      const itemDate = new Date(item.time);
      return itemDate >= startDate && itemDate <= endDate;
    }
  );
};

// Calculate average for a property in an array of objects
export const calculateAverage = (
  data: any[],
  property: string
): number => {
  if (!data.length) return 0;
  
  const sum = data.reduce((acc, item) => {
    const value = item[property];
    return acc + (typeof value === 'number' ? value : 0);
  }, 0);
  
  return parseFloat((sum / data.length).toFixed(1));
};

// Format date for display or chart labels
export const formatDate = (date: Date, format: 'short' | 'medium' | 'long' = 'medium'): string => {
  if (format === 'short') {
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }
  
  if (format === 'long') {
    return date.toLocaleDateString(undefined, { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric' 
    });
  }
  
  // medium
  return date.toLocaleDateString(undefined, { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric' 
  });
};

// Calculate health score based on various factors
export const calculateHealthScore = (healthData: HealthData): number => {
  // Get the most recent data for each category
  const recentDays = 7; // Consider data from the last 7 days
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - recentDays);
  
  // Get recent sleep data
  const recentSleep = filterDataByDateRange(healthData.sleep, weekAgo, now);
  const avgSleepHours = calculateAverage(recentSleep, 'hours');
  const avgSleepQuality = calculateAverage(recentSleep, 'quality');
  
  // Sleep score: 30% of total (15% hours, 15% quality)
  const sleepHoursScore = Math.min(100, (avgSleepHours / 8) * 100); // Optimal is 8 hours
  const sleepQualityScore = (avgSleepQuality / 10) * 100;
  const sleepScore = (sleepHoursScore * 0.15) + (sleepQualityScore * 0.15);
  
  // Get recent activity data
  const recentActivity = filterDataByDateRange(healthData.activity, weekAgo, now);
  const avgActivityMinutes = calculateAverage(recentActivity, 'minutes');
  const avgActivityIntensity = calculateAverage(recentActivity, 'intensity');
  
  // Activity score: 30% of total (20% minutes, 10% intensity)
  const activityMinutesScore = Math.min(100, (avgActivityMinutes / 30) * 100); // Optimal is 30+ minutes
  const activityIntensityScore = (avgActivityIntensity / 10) * 100;
  const activityScore = (activityMinutesScore * 0.2) + (activityIntensityScore * 0.1);
  
  // Get recent diet data
  const recentDiet = filterDataByDateRange(healthData.diet, weekAgo, now);
  const avgMealQuality = recentDiet.reduce((acc, day) => {
    const dayAvg = calculateAverage(day.meals, 'quality');
    return acc + dayAvg;
  }, 0) / (recentDiet.length || 1);
  
  const avgWater = calculateAverage(recentDiet, 'water');
  
  // Diet score: 20% of total (15% meal quality, 5% water)
  const mealQualityScore = (avgMealQuality / 10) * 100;
  const waterScore = Math.min(100, (avgWater / 8) * 100); // Optimal is 8 glasses
  const dietScore = (mealQualityScore * 0.15) + (waterScore * 0.05);
  
  // Get recent stress data
  const recentStress = filterDataByDateRange(healthData.stress, weekAgo, now);
  const avgStressLevel = calculateAverage(recentStress, 'level');
  
  // Stress score: 20% of total (inverted, as lower stress is better)
  const stressScore = ((10 - avgStressLevel) / 10) * 100 * 0.2;
  
  // Calculate total score
  const totalScore = sleepScore + activityScore + dietScore + stressScore;
  
  return Math.round(totalScore);
};

// Generate insights based on health data
export const generateInsights = (healthData: HealthData): { title: string; description: string; type: 'info' | 'warning' | 'success' }[] => {
  const insights: { title: string; description: string; type: 'info' | 'warning' | 'success' }[] = [];
  
  // Get the most recent data for each category
  const recentDays = 7; // Consider data from the last 7 days
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - recentDays);
  
  // Sleep insights
  const recentSleep = filterDataByDateRange(healthData.sleep, weekAgo, now);
  const avgSleepHours = calculateAverage(recentSleep, 'hours');
  
  if (avgSleepHours < 6) {
    insights.push({
      title: 'Sleep Duration Alert',
      description: `Your average sleep duration (${avgSleepHours} hours) is below the recommended 7-9 hours, which may impact your energy and overall health.`,
      type: 'warning',
    });
  } else if (avgSleepHours >= 7 && avgSleepHours <= 9) {
    insights.push({
      title: 'Optimal Sleep Duration',
      description: `Great job maintaining an average of ${avgSleepHours} hours of sleep, which falls within the ideal range for adults.`,
      type: 'success',
    });
  }
  
  // Activity insights
  const recentActivity = filterDataByDateRange(healthData.activity, weekAgo, now);
  const avgActivityMinutes = calculateAverage(recentActivity, 'minutes');
  
  if (avgActivityMinutes < 20) {
    insights.push({
      title: 'Activity Level Alert',
      description: `Your physical activity level (${avgActivityMinutes} mins/day) is below the recommended 30 minutes per day. Consider adding a short walk to your routine.`,
      type: 'warning',
    });
  } else if (avgActivityMinutes >= 30) {
    insights.push({
      title: 'Excellent Activity Level',
      description: `You're averaging ${avgActivityMinutes} minutes of activity daily, which meets or exceeds recommendations. Keep it up!`,
      type: 'success',
    });
  }
  
  // Stress insights
  const recentStress = filterDataByDateRange(healthData.stress, weekAgo, now);
  const avgStressLevel = calculateAverage(recentStress, 'level');
  
  if (avgStressLevel > 7) {
    insights.push({
      title: 'High Stress Detected',
      description: `Your stress levels are consistently high. Consider incorporating mindfulness practices or breaks throughout your day.`,
      type: 'warning',
    });
  } else if (avgStressLevel < 4) {
    insights.push({
      title: 'Stress Management Success',
      description: `Your stress levels are well-managed. Your mindfulness practices appear to be working effectively.`,
      type: 'success',
    });
  }
  
  // Add a general insight if we have few specific ones
  if (insights.length < 2) {
    insights.push({
      title: 'Consistent Tracking Builds Insights',
      description: 'Continue logging your daily health metrics to receive more personalized insights and recommendations.',
      type: 'info',
    });
  }
  
  return insights;
};

// Generate recommendations based on health data
export const generateRecommendations = (healthData: HealthData): string[] => {
  const recommendations: string[] = [];
  
  // Get the most recent data for each category
  const recentDays = 7; // Consider data from the last 7 days
  const now = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - recentDays);
  
  // Sleep recommendations
  const recentSleep = filterDataByDateRange(healthData.sleep, weekAgo, now);
  const avgSleepHours = calculateAverage(recentSleep, 'hours');
  const avgSleepQuality = calculateAverage(recentSleep, 'quality');
  
  if (avgSleepHours < 7) {
    recommendations.push('Try going to bed 30 minutes earlier to improve your sleep duration.');
  }
  
  if (avgSleepQuality < 6) {
    recommendations.push('Improve sleep quality by reducing screen time 1 hour before bed and keeping your bedroom cool and dark.');
  }
  
  // Activity recommendations
  const recentActivity = filterDataByDateRange(healthData.activity, weekAgo, now);
  const avgActivityMinutes = calculateAverage(recentActivity, 'minutes');
  
  if (avgActivityMinutes < 30) {
    recommendations.push('Add a 10-minute walk after lunch to boost your daily activity level.');
  }
  
  // Stress recommendations
  const recentStress = filterDataByDateRange(healthData.stress, weekAgo, now);
  const avgStressLevel = calculateAverage(recentStress, 'level');
  
  if (avgStressLevel > 6) {
    recommendations.push('Practice 5 minutes of deep breathing or meditation when you feel stress building up.');
  }
  
  // Diet recommendations
  const recentDiet = filterDataByDateRange(healthData.diet, weekAgo, now);
  const avgWater = calculateAverage(recentDiet, 'water');
  
  if (avgWater < 6) {
    recommendations.push('Increase water intake by keeping a refillable bottle nearby throughout the day.');
  }
  
  // General recommendations if we have few specific ones
  if (recommendations.length < 2) {
    recommendations.push('Maintain your current healthy routines while focusing on consistency.');
    recommendations.push('Consider adding variety to your physical activities to engage different muscle groups.');
  }
  
  return recommendations;
};

// Generate mock data for testing
export const generateMockHealthData = (): HealthData => {
  const today = new Date();
  const mockData: HealthData = {
    sleep: [],
    activity: [],
    diet: [],
    stress: []
  };
  
  // Generate 14 days of data
  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Sleep data (7-8 hours with some variation)
    mockData.sleep.push({
      hours: 7 + Math.random() * 1.5 - 0.5,
      quality: 5 + Math.floor(Math.random() * 5),
      time: new Date(date)
    });
    
    // Activity data (20-40 minutes with some variation)
    mockData.activity.push({
      minutes: 20 + Math.floor(Math.random() * 30),
      intensity: 5 + Math.floor(Math.random() * 5),
      type: ['walking', 'running', 'cycling', 'yoga'][Math.floor(Math.random() * 4)],
      time: new Date(date)
    });
    
    // Diet data
    mockData.diet.push({
      meals: [
        {
          name: 'Breakfast',
          quality: 5 + Math.floor(Math.random() * 5),
          time: new Date(date)
        },
        {
          name: 'Lunch',
          quality: 5 + Math.floor(Math.random() * 5),
          time: new Date(date)
        },
        {
          name: 'Dinner',
          quality: 5 + Math.floor(Math.random() * 5),
          time: new Date(date)
        }
      ],
      water: 4 + Math.floor(Math.random() * 5),
      time: new Date(date)
    });
    
    // Stress data (3-7 with some variation)
    mockData.stress.push({
      level: 3 + Math.floor(Math.random() * 5),
      notes: '',
      time: new Date(date)
    });
  }
  
  return mockData;
};

// Prepare data for charts
export const prepareChartData = (data: any[], dateField: string, valueField: string, days = 7): { date: string; value: number }[] => {
  const result: { date: string; value: number }[] = [];
  const today = new Date();
  
  // Create a map to aggregate data by date
  const dateMap = new Map<string, { sum: number; count: number }>();
  
  // Initialize the map with the last 'days' days
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateStr = formatDate(date, 'short');
    dateMap.set(dateStr, { sum: 0, count: 0 });
  }
  
  // Aggregate data
  data.forEach(item => {
    const date = new Date(item[dateField]);
    // Only include data from the last 'days' days
    const daysDiff = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < days) {
      const dateStr = formatDate(date, 'short');
      const current = dateMap.get(dateStr) || { sum: 0, count: 0 };
      dateMap.set(dateStr, {
        sum: current.sum + item[valueField],
        count: current.count + 1
      });
    }
  });
  
  // Convert map to array and calculate averages
  dateMap.forEach((value, key) => {
    result.push({
      date: key,
      value: value.count ? parseFloat((value.sum / value.count).toFixed(1)) : 0
    });
  });
  
  return result;
};
