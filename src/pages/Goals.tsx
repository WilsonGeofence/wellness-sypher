
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Goal } from '@/types/goal';
import GoalItem from '@/components/goal/GoalItem';
import GoalForm from '@/components/goal/GoalForm';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { useToast } from '@/hooks/use-toast';

const Goals: React.FC = () => {
  const { user } = useRequireAuth();
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Improve sleep quality",
      description: "Aim for 7-8 hours of quality sleep each night",
      type: "sleep",
      targetDate: new Date(2023, 11, 31),
      completedSteps: 2,
      totalSteps: 5
    },
    {
      id: "2",
      title: "Increase daily steps",
      description: "Reach 10,000 steps per day consistently",
      type: "activity",
      targetDate: new Date(2023, 10, 15),
      completedSteps: 3,
      totalSteps: 7
    },
    {
      id: "3",
      title: "Reduce processed foods",
      description: "Limit processed food intake to once per week",
      type: "diet",
      targetDate: new Date(2023, 11, 1),
      completedSteps: 1,
      totalSteps: 4
    }
  ]);

  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('userGoals');
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals);
        // Convert string dates back to Date objects
        const goalsWithDates = parsedGoals.map((goal: any) => ({
          ...goal,
          targetDate: goal.targetDate ? new Date(goal.targetDate) : undefined
        }));
        setGoals(goalsWithDates);
      } catch (error) {
        console.error('Failed to parse saved goals:', error);
      }
    }
  }, []);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userGoals', JSON.stringify(goals));
  }, [goals]);

  const handleAddGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal]);
    setIsAddingGoal(false);
    toast({
      title: "Goal Added",
      description: "Your new goal has been created successfully."
    });
  };

  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    setEditingGoal(null);
    toast({
      title: "Goal Updated",
      description: "Your goal has been updated successfully."
    });
  };

  const handleUpdateProgress = (id: string, progress: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const updatedSteps = Math.min(progress, goal.totalSteps);
        const isCompleted = updatedSteps >= goal.totalSteps;
        return { 
          ...goal, 
          completedSteps: updatedSteps,
          isCompleted: isCompleted
        };
      }
      return goal;
    }));
    
    toast({
      title: "Progress Updated",
      description: "Your goal progress has been updated."
    });
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast({
      title: "Goal Deleted",
      description: "Your goal has been removed.",
      variant: "destructive"
    });
  };

  const handleToggleComplete = (id: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const isCompleted = !goal.isCompleted;
        return { 
          ...goal, 
          isCompleted,
          completedSteps: isCompleted ? goal.totalSteps : goal.completedSteps
        };
      }
      return goal;
    }));
    
    toast({
      title: "Goal Status Changed",
      description: "Your goal status has been updated."
    });
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-sypher-black">My Health Goals</h1>
            <p className="text-sypher-gray-dark">Track your progress towards better health</p>
          </div>
          <Button 
            onClick={() => {
              setIsAddingGoal(true);
              setEditingGoal(null);
            }}
            className="bg-sypher-blue-accent hover:bg-sypher-blue-dark text-white"
          >
            <Plus size={18} className="mr-1" /> Add Goal
          </Button>
        </div>

        {isAddingGoal && (
          <GoalForm
            onSave={handleAddGoal}
            onCancel={() => setIsAddingGoal(false)}
          />
        )}

        {editingGoal && (
          <GoalForm
            goal={editingGoal}
            onSave={handleUpdateGoal}
            onCancel={() => setEditingGoal(null)}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <GoalItem 
              key={goal.id}
              goal={goal}
              onUpdateProgress={handleUpdateProgress}
              onEdit={setEditingGoal}
              onDelete={handleDeleteGoal}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>

        {goals.length === 0 && !isAddingGoal && (
          <div className="text-center py-10">
            <p className="text-sypher-gray-dark mb-4">You don't have any goals yet.</p>
            <Button 
              onClick={() => setIsAddingGoal(true)}
              className="bg-sypher-blue-accent hover:bg-sypher-blue-dark text-white"
            >
              <Plus size={18} className="mr-1" /> Create Your First Goal
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Goals;
