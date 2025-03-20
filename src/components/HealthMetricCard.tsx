
import React, { useState } from 'react';
import { Plus, Minus, Check, X } from 'lucide-react';

type HealthMetricProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  value: number | string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  type: 'slider' | 'counter' | 'selection';
  onChange: (value: number | string) => void;
};

const HealthMetricCard: React.FC<HealthMetricProps> = ({
  title,
  description,
  icon,
  value,
  unit,
  min = 0,
  max = 10,
  step = 1,
  options = [],
  type,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState<number | string>(value);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(parseFloat(e.target.value));
  };

  const handleCounterChange = (amount: number) => {
    const newValue = typeof tempValue === 'number' 
      ? Math.max(min, Math.min(max, tempValue + amount)) 
      : min;
    setTempValue(newValue);
  };

  const handleSelectionChange = (option: string) => {
    setTempValue(option);
  };

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <div className="glass-card p-5 transition-all duration-300 animate-fade-in-up">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="mr-3 text-sypher-blue-accent">{icon}</div>
          <div>
            <h3 className="font-medium text-lg text-sypher-black">{title}</h3>
            <p className="text-sm text-sypher-gray-dark/70">{description}</p>
          </div>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-xs px-3 py-1 rounded-full bg-sypher-blue text-sypher-blue-dark font-medium shadow-sm hover:shadow transition-shadow duration-200"
          >
            Update
          </button>
        ) : (
          <div className="flex space-x-2">
            <button 
              onClick={handleSave}
              className="p-1.5 rounded-full bg-sypher-blue text-sypher-blue-dark hover:bg-sypher-blue-accent hover:text-white transition-colors duration-200"
            >
              <Check size={16} />
            </button>
            <button 
              onClick={handleCancel}
              className="p-1.5 rounded-full bg-sypher-gray-light text-sypher-gray-dark hover:bg-sypher-gray-dark hover:text-white transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="text-3xl font-light text-sypher-black mt-6 mb-2">
          {value}
          {unit && <span className="text-base ml-1 text-sypher-gray-dark/70">{unit}</span>}
        </div>
      ) : (
        <div className="mt-4">
          {type === 'slider' && (
            <div className="space-y-4">
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={tempValue as number}
                onChange={handleSliderChange}
                className="w-full h-2 bg-sypher-blue rounded-lg appearance-none cursor-pointer accent-sypher-blue-accent"
              />
              <div className="text-center text-lg font-medium">
                {tempValue}
                {unit && <span className="text-sm ml-1 text-sypher-gray-dark/70">{unit}</span>}
              </div>
            </div>
          )}

          {type === 'counter' && (
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => handleCounterChange(-step)}
                disabled={typeof tempValue === 'number' && tempValue <= min}
                className="neo-button h-10 w-10 flex items-center justify-center disabled:opacity-50"
              >
                <Minus size={20} />
              </button>
              <div className="text-2xl font-medium w-12 text-center">
                {tempValue}
                {unit && <span className="text-sm ml-1 text-sypher-gray-dark/70">{unit}</span>}
              </div>
              <button
                onClick={() => handleCounterChange(step)}
                disabled={typeof tempValue === 'number' && tempValue >= max}
                className="neo-button h-10 w-10 flex items-center justify-center disabled:opacity-50"
              >
                <Plus size={20} />
              </button>
            </div>
          )}

          {type === 'selection' && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelectionChange(option)}
                  className={`py-2 px-3 rounded-lg transition-all duration-200 text-center ${
                    tempValue === option
                      ? 'bg-sypher-blue-accent text-white font-medium shadow-sm'
                      : 'bg-sypher-gray-light text-sypher-gray-dark hover:bg-sypher-blue hover:text-sypher-blue-dark'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HealthMetricCard;
