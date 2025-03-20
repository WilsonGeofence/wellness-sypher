
import React, { useState } from 'react';
import { Target, Check, Edit2, Trash } from 'lucide-react';

export type Goal = {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  category: 'sleep' | 'activity' | 'diet' | 'stress' | 'other';
  createdAt: Date;
  completedAt?: Date;
};

type GoalCardProps = {
  goal: Goal;
  onUpdate: (goal: Goal) => void;
  onDelete: (id: string) => void;
};

const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState<Goal>(goal);

  const progressPercentage = Math.min(100, (goal.current / goal.target) * 100);
  const isCompleted = goal.completedAt !== undefined;

  const categoryColors = {
    sleep: 'bg-indigo-100 text-indigo-800',
    activity: 'bg-emerald-100 text-emerald-800',
    diet: 'bg-amber-100 text-amber-800',
    stress: 'bg-rose-100 text-rose-800',
    other: 'bg-gray-100 text-gray-800',
  };

  const handleToggleComplete = () => {
    onUpdate({
      ...goal,
      completedAt: isCompleted ? undefined : new Date()
    });
  };

  const handleSave = () => {
    onUpdate(editedGoal);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedGoal(goal);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedGoal(prev => ({
      ...prev,
      [name]: name === 'target' || name === 'current' ? parseFloat(value) : value
    }));
  };

  return (
    <div className={`neo-card p-5 ${isCompleted ? 'opacity-70' : ''} animate-fade-in-up`}>
      {!isEditing ? (
        <>
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
              <Target className="text-sypher-blue-accent" size={20} />
              <h3 className={`font-medium text-lg ${isCompleted ? 'line-through text-sypher-gray-dark/70' : 'text-sypher-black'}`}>
                {goal.title}
              </h3>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsEditing(true)}
                className="p-1.5 rounded-full hover:bg-sypher-gray-light transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => onDelete(goal.id)}
                className="p-1.5 rounded-full hover:bg-sypher-gray-light transition-colors"
              >
                <Trash size={16} />
              </button>
              <button 
                onClick={handleToggleComplete}
                className={`p-1.5 rounded-full transition-colors ${
                  isCompleted 
                  ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' 
                  : 'hover:bg-sypher-gray-light'
                }`}
              >
                <Check size={16} />
              </button>
            </div>
          </div>

          <p className="text-sm text-sypher-gray-dark/70 mb-4">{goal.description}</p>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-sypher-gray-dark/70">Progress</span>
              <span className="font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-2 bg-sypher-gray-light rounded-full overflow-hidden">
              <div 
                className="h-full bg-sypher-blue-accent rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-light">
                {goal.current}
                <span className="text-sm text-sypher-gray-dark/70 ml-1">{goal.unit}</span>
              </span>
              <span className="mx-2 text-sypher-gray-dark/40">/</span>
              <span className="text-lg font-medium">
                {goal.target}
                <span className="text-sm text-sypher-gray-dark/70 ml-1">{goal.unit}</span>
              </span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[goal.category]}`}>
              {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sypher-gray-dark mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={editedGoal.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white rounded-lg border border-sypher-gray-light focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-sypher-gray-dark mb-1">Description</label>
            <textarea
              name="description"
              value={editedGoal.description}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 bg-white rounded-lg border border-sypher-gray-light focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
            />
          </div>
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-sypher-gray-dark mb-1">Target</label>
              <input
                type="number"
                name="target"
                value={editedGoal.target}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white rounded-lg border border-sypher-gray-light focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-sypher-gray-dark mb-1">Current</label>
              <input
                type="number"
                name="current"
                value={editedGoal.current}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white rounded-lg border border-sypher-gray-light focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
              />
            </div>
            <div className="w-24">
              <label className="block text-sm font-medium text-sypher-gray-dark mb-1">Unit</label>
              <input
                type="text"
                name="unit"
                value={editedGoal.unit}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white rounded-lg border border-sypher-gray-light focus:outline-none focus:ring-2 focus:ring-sypher-blue-accent/50"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-lg text-sypher-gray-dark hover:bg-sypher-gray-light transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-sypher-blue-accent text-white hover:bg-sypher-blue-dark transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalCard;
