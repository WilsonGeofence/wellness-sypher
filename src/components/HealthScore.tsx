
import React, { useEffect, useState } from 'react';

type HealthScoreProps = {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
};

const HealthScore: React.FC<HealthScoreProps> = ({ 
  score, 
  size = 'md',
  showLabel = true 
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    // Animate the score from 0 to the actual value
    const duration = 1500;
    const frameRate = 60;
    const totalFrames = duration / (1000 / frameRate);
    const increment = score / totalFrames;
    
    let currentFrame = 0;
    let currentScore = 0;
    
    const interval = setInterval(() => {
      currentFrame++;
      currentScore += increment;
      
      if (currentFrame >= totalFrames) {
        clearInterval(interval);
        setAnimatedScore(score);
      } else {
        setAnimatedScore(Math.min(currentScore, score));
      }
    }, 1000 / frameRate);
    
    return () => clearInterval(interval);
  }, [score]);
  
  // Size mappings
  const sizeMappings = {
    sm: {
      width: 120,
      height: 120,
      fontSize: 'text-xl',
      labelSize: 'text-xs',
      strokeWidth: 6,
    },
    md: {
      width: 180,
      height: 180,
      fontSize: 'text-3xl',
      labelSize: 'text-sm',
      strokeWidth: 8,
    },
    lg: {
      width: 240,
      height: 240,
      fontSize: 'text-5xl',
      labelSize: 'text-base',
      strokeWidth: 10,
    },
  };
  
  const { width, height, fontSize, labelSize, strokeWidth } = sizeMappings[size];
  
  // Calculate the circle properties
  const radius = width / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;
  
  // Determine the color based on the score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-amber-500';
    return 'text-rose-500';
  };
  
  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Focus';
  };
  
  return (
    <div className="flex flex-col items-center justify-center animate-fade-in">
      <div className="relative" style={{ width, height }}>
        {/* Background circle */}
        <svg width={width} height={height} className="absolute">
          <circle
            className="text-sypher-gray-light"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={width / 2}
            cy={height / 2}
          />
          {/* Progress circle */}
          <circle
            className={getScoreColor(animatedScore)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={width / 2}
            cy={height / 2}
            style={{ 
              transition: 'stroke-dashoffset 0.5s ease-in-out',
              transform: 'rotate(-90deg)',
              transformOrigin: 'center'
            }}
          />
        </svg>
        
        {/* Score display */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ 
            animation: 'pulse-soft 3s infinite ease-in-out'
          }}
        >
          <div className={`${fontSize} font-semibold ${getScoreColor(animatedScore)}`}>
            {Math.round(animatedScore)}
          </div>
          {showLabel && (
            <div className={`${labelSize} text-sypher-gray-dark/70 mt-1`}>
              {getScoreText(animatedScore)}
            </div>
          )}
        </div>
      </div>
      
      {showLabel && (
        <div className="mt-4 text-center">
          <h3 className="font-medium text-lg text-sypher-black">Health Score</h3>
          <p className="text-sm text-sypher-gray-dark/70">Your overall wellness rating</p>
        </div>
      )}
    </div>
  );
};

export default HealthScore;
