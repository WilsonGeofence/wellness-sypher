
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Plus, Check, X, ChevronRight, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

type GoalType = "sleep" | "activity" | "diet" | "stress" | "other";

interface Goal {
  id: string;
  title: string;
  description?: string;
  type: GoalType;
  targetDate?: Date;
  completedSteps: number;
  totalSteps: number;
}

const Goals: React.FC = () => {
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
  const [newGoal, setNewGoal] = useState<{
    title: string;
    description: string;
    type: GoalType;
  }>({
    title: "",
    description: "",
    type: "other"
  });

  const handleAddGoal = () => {
    if (newGoal.title.trim() === "") return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      type: newGoal.type,
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      completedSteps: 0,
      totalSteps: 5
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: "",
      description: "",
      type: "other"
    });
    setIsAddingGoal(false);
  };

  const getTypeIcon = (type: GoalType) => {
    switch (type) {
      case "sleep":
        return "😴";
      case "activity":
        return "🏃";
      case "diet":
        return "🥗";
      case "stress":
        return "🧘";
      case "other":
        return "🎯";
    }
  };

  const getProgressColor = (completed: number, total: number) => {
    const percentage = (completed / total) * 100;
    if (percentage < 30) return "bg-red-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-green-500";
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
            onClick={() => setIsAddingGoal(true)}
            className="bg-sypher-blue-accent hover:bg-sypher-blue-dark text-white"
          >
            <Plus size={18} className="mr-1" /> Add Goal
          </Button>
        </div>

        {isAddingGoal ? (
          <Card className="mb-6 animate-fade-in-up neo-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                Create a New Goal
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsAddingGoal(false)}
                    className="text-sypher-gray-dark hover:text-red-500"
                  >
                    <X size={18} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleAddGoal}
                    className="text-sypher-blue-accent"
                    disabled={!newGoal.title.trim()}
                  >
                    <Check size={18} />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="goal-title">Goal Title</Label>
                  <Input 
                    id="goal-title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    placeholder="What do you want to achieve?"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="goal-description">Description (optional)</Label>
                  <Textarea 
                    id="goal-description"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    placeholder="Add more details about your goal"
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Goal Type</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-1">
                    {(["sleep", "activity", "diet", "stress", "other"] as GoalType[]).map((type) => (
                      <button
                        key={type}
                        className={`px-3 py-2 rounded-lg flex items-center justify-center space-x-2 
                          ${newGoal.type === type 
                            ? 'bg-sypher-blue text-sypher-blue-dark border-2 border-sypher-blue-accent' 
                            : 'bg-white border border-sypher-gray-light'}`}
                        onClick={() => setNewGoal({...newGoal, type})}
                      >
                        <span>{getTypeIcon(type)}</span>
                        <span className="capitalize">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <Card 
              key={goal.id} 
              className="overflow-hidden neo-card hover:shadow-xl transition-all duration-300"
            >
              <div className="h-2 w-full bg-gray-200">
                <div 
                  className={`h-full ${getProgressColor(goal.completedSteps, goal.totalSteps)}`} 
                  style={{ width: `${(goal.completedSteps / goal.totalSteps) * 100}%` }}
                ></div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <span className="mr-2">{getTypeIcon(goal.type)}</span>
                  {goal.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {goal.description && (
                  <p className="text-sypher-gray-dark mb-3 text-sm">{goal.description}</p>
                )}
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-sypher-gray-dark">Progress: </span>
                    <span className="font-medium">{goal.completedSteps}/{goal.totalSteps} steps</span>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-sypher-blue-accent">
                        <ChevronRight size={18} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">Goal Details</h4>
                        <div className="text-sm space-y-1">
                          <div><span className="text-sypher-gray-dark">Type:</span> <span className="capitalize">{goal.type}</span></div>
                          {goal.targetDate && (
                            <div>
                              <span className="text-sypher-gray-dark">Target date:</span>{' '}
                              {goal.targetDate.toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end space-x-2 mt-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            <Edit size={14} className="mr-1" /> Edit
                          </Button>
                          <Button size="sm" className="bg-sypher-blue text-sypher-blue-dark text-xs">
                            Update Progress
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Goals;
