
import React, { useState } from 'react';
import { Goal, GoalType } from '@/types/goal';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, X } from 'lucide-react';

interface GoalFormProps {
  goal?: Goal;
  onSave: (goal: Goal) => void;
  onCancel: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ goal, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Goal>(
    goal || {
      id: Date.now().toString(),
      title: "",
      description: "",
      type: "other" as GoalType,
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      completedSteps: 0,
      totalSteps: 5
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    onSave(formData);
  };

  const getTypeIcon = (type: GoalType) => {
    switch (type) {
      case "sleep": return "😴";
      case "activity": return "🏃";
      case "diet": return "🥗";
      case "stress": return "🧘";
      case "other": return "🎯";
    }
  };

  return (
    <Card className="mb-6 animate-fade-in-up neo-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          {goal ? 'Edit Goal' : 'Create a New Goal'}
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCancel}
              className="text-sypher-gray-dark hover:text-red-500"
            >
              <X size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSubmit}
              className="text-sypher-blue-accent"
              disabled={!formData.title.trim()}
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
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What do you want to achieve?"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="goal-description">Description (optional)</Label>
            <Textarea 
              id="goal-description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Add more details about your goal"
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <Label>Goal Type</Label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-1">
              {(['sleep', 'activity', 'diet', 'stress', 'other'] as GoalType[]).map((type) => (
                <button
                  key={type}
                  className={`px-3 py-2 rounded-lg flex items-center justify-center space-x-2 
                    ${formData.type === type 
                      ? 'bg-sypher-blue text-sypher-blue-dark border-2 border-sypher-blue-accent' 
                      : 'bg-white border border-sypher-gray-light'}`}
                  onClick={() => setFormData({...formData, type})}
                  type="button"
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
  );
};

export default GoalForm;
