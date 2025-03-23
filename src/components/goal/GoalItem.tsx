
import React from 'react';
import { Check, ChevronRight, Edit } from 'lucide-react';
import { Goal } from '@/types/goal';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface GoalItemProps {
  goal: Goal;
  onUpdateProgress: (id: string, progress: number) => void;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const GoalItem: React.FC<GoalItemProps> = ({ 
  goal, 
  onUpdateProgress, 
  onEdit, 
  onDelete,
  onToggleComplete
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "sleep": return "😴";
      case "activity": return "🏃";
      case "diet": return "🥗";
      case "stress": return "🧘";
      case "other": return "🎯";
    }
  };

  const getProgressColor = (completed: number, total: number) => {
    const percentage = (completed / total) * 100;
    if (percentage < 30) return "bg-red-500";
    if (percentage < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="overflow-hidden neo-card hover:shadow-xl transition-all duration-300">
      <div className="h-2 w-full bg-gray-200">
        <div 
          className={`h-full ${getProgressColor(goal.completedSteps, goal.totalSteps)}`} 
          style={{ width: `${(goal.completedSteps / goal.totalSteps) * 100}%` }}
        ></div>
      </div>
      <div className="p-4">
        <div className="pb-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-2">{getTypeIcon(goal.type)}</span>
            <h3 className={`text-lg font-medium ${goal.isCompleted ? 'line-through text-sypher-gray-dark/70' : ''}`}>
              {goal.title}
            </h3>
          </div>
          <button
            onClick={() => onToggleComplete(goal.id)}
            className={`p-1.5 rounded-full transition-colors ${
              goal.isCompleted 
              ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' 
              : 'hover:bg-sypher-gray-light'
            }`}
          >
            <Check size={16} />
          </button>
        </div>
        
        {goal.description && (
          <p className="text-sypher-gray-dark mb-3 text-sm">{goal.description}</p>
        )}
        
        <div className="flex items-center justify-between text-sm mt-3">
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
                  <Button size="sm" variant="outline" className="text-xs" onClick={() => onEdit(goal)}>
                    <Edit size={14} className="mr-1" /> Edit
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-sypher-blue text-sypher-blue-dark text-xs"
                    onClick={() => onUpdateProgress(goal.id, goal.completedSteps + 1)}
                  >
                    Update Progress
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default GoalItem;
