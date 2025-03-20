
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GoalCard from '../components/GoalCard';
import { Plus, Target, Moon, Activity, Heart, Utensils } from 'lucide-react';
import { generateInsights, type Goal } from '../utils/healthUtils';

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: '',
    description: '',
    target: 0,
    current: 0,
    unit: '',
    category: 'other',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load goals on mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('goals');
    if (savedGoals) {
      const parsedGoals = JSON.parse(savedGoals, (key, value) => {
        if (key === 'createdAt' || key === 'completedAt') {
          return value ? new Date(value) : undefined;
        }
        return value;
      });
      setGoals(parsedGoals);
    } else {
      // Set some example goals for first-time users
      const exampleGoals: Goal[] = [
        {
          id: '1',
          title: 'Improve Sleep Quality',
          description: 'Get 7-8 hours of quality sleep each night',
          target: 8,
          current: 6.5,
          unit: 'hours',
          category: 'sleep',
          createdAt: new Date(),
        },
        {
          id: '2',
          title: 'Daily Movement',
          description: 'Stay active with regular exercise',
          target: 30,
          current: 20,
          unit: 'minutes',
          category: 'activity',
          createdAt: new Date(),
        },
        {
          id: '3',
          title: 'Stress Management',
          description: 'Practice mindfulness or meditation',
          target: 10,
          current: 5,
          unit: 'minutes',
          category: 'stress',
          createdAt: new Date(),
        },
      ];
      setGoals(exampleGoals);
      localStorage.setItem('goals', JSON.stringify(exampleGoals));
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) return;

    const goal: Goal = {
      id: Math.random().toString(36).substring(2),
      title: newGoal.title,
      description: newGoal.description || '',
      target: newGoal.target,
      current: newGoal.current || 0,
      unit: newGoal.unit || '',
      category: newGoal.category as 'sleep' | 'activity' | 'diet' | 'stress' | 'other',
      createdAt: new Date(),
    };

    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
    setNewGoal({
      title: '',
      description: '',
      target: 0,
      current: 0,
      unit: '',
      category: 'other',
    });
    setIsAddingGoal(false);
  };

  const handleUpdateGoal = (updatedGoal: Goal) => {
    const updatedGoals = goals.map(goal => 
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const handleDeleteGoal = (id: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const categoryIcons = {
    sleep: <Moon size={20} />,
    activity: <Activity size={20} />,
    stress: <Heart size={20} />,
    diet: <Utensils size={20} />,
    other: <Target size={20} />,
  };

  const getProgress = () => {
    if (!goals.length) return 0;
    const completedGoals = goals.filter(goal => goal.completedAt).length;
    return Math.round((completedGoals / goals.length) * 100);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-sypher-blue animate-pulse-soft"></div>
            <p className="mt-4 text-sypher-gray-dark">Loading your goals...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold text-sypher-black">Your Goals</h1>
            <p className="text-sypher-gray-dark mt-1">Track and manage your health and wellness targets</p>
          </div>
          <button
            onClick={() => setIsAddingGoal(true)}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-sypher-blue-accent text-white rounded-xl hover:bg-sypher-blue-dark transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add New Goal
          </button>
        </div>

        {/* Progress Overview */}
        <div className="glass-card p-6 mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h2 className="text-xl font-semibold text-sypher-black mb-4">Overall Progress</h2>
          <div className="flex items-center">
            <div className="flex-1">
              <div className="h-3 bg-sypher-gray-light rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sypher-blue-accent rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${getProgress()}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-sypher-gray-dark">{getProgress()}% Complete</span>
                <span className="text-sypher-gray-dark">
                  {goals.filter(goal => goal.completedAt).length} of {goals.length} Goals
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal, index) => (
            <div 
              key={goal.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${200 + (index * 100)}ms` }}
            >
              <GoalCard
                goal={goal}
                onUpdate={handleUpdateGoal}
                onDelete={handleDeleteGoal}
              />
            </div>
          ))}
        </div>

        {/* New Goal Modal */}
        {isAddingGoal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-6 animate-scale-in">
              <h2 className="text-2xl font-bold text-sypher-black mb-6">Create New Goal</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-sypher-gray-dark mb-1">
                    Category
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {Object.entries(categoryIcons).map(([category, icon]) => (
                      <button
                        key={category}
                        onClick={() => setNewGoal({ ...newGoal, category })}
                        className={`flex items-center justify-center p-3 rounded-xl transition-all ${
                          newGoal.category === category
                            ? 'bg-sypher-blue text-sypher-blue-dark shadow-neo'
                            : 'neo-button'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-sypher-gray-dark mb-1">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    placeholder="Enter your goal"
                    className="w-full px-4 py-2 bg-white rounded-xl border border-sypher-gray-light focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-sypher-gray-dark mb-1">
                    Description
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    placeholder="Add some details about your goal"
                    rows={3}
                    className="w-full px-4 py-2 bg-white rounded-xl border border-sypher-gray-light focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-sypher-gray-dark mb-1">
                      Target Value
                    </label>
                    <input
                      type="number"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({ ...newGoal, target: parseFloat(e.target.value) })}
                      placeholder="Enter target"
                      className="w-full px-4 py-2 bg-white rounded-xl border border-sypher-gray-light focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-sypher-gray-dark mb-1">
                      Unit
                    </label>
                    <input
                      type="text"
                      value={newGoal.unit}
                      onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                      placeholder="e.g., hours, steps"
                      className="w-full px-4 py-2 bg-white rounded-xl border border-sypher-gray-light focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsAddingGoal(false)}
                  className="px-4 py-2 rounded-xl text-sypher-gray-dark hover:bg-sypher-gray-light transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddGoal}
                  disabled={!newGoal.title || !newGoal.target}
                  className="px-4 py-2 bg-sypher-blue-accent text-white rounded-xl hover:bg-sypher-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Goals;
