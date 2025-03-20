
import React from 'react';
import { Lightbulb, ArrowUpRight } from 'lucide-react';

type InsightCardProps = {
  title: string;
  description: string;
  type: 'info' | 'warning' | 'success';
  actionText?: string;
  onAction?: () => void;
};

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  type,
  actionText,
  onAction,
}) => {
  // Define styles based on insight type
  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          iconColor: 'text-amber-500',
          chipColor: 'bg-amber-500/10 text-amber-700',
        };
      case 'success':
        return {
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          iconColor: 'text-emerald-500',
          chipColor: 'bg-emerald-500/10 text-emerald-700',
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-sypher-blue',
          borderColor: 'border-sypher-blue-accent/20',
          iconColor: 'text-sypher-blue-accent',
          chipColor: 'bg-sypher-blue-accent/10 text-sypher-blue-dark',
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`rounded-2xl ${styles.bgColor} border ${styles.borderColor} p-5 shadow-sm animate-fade-in-up`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 ${styles.iconColor}`}>
          <Lightbulb size={24} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles.chipColor}`}>
              {type === 'info' ? 'Insight' : type === 'warning' ? 'Attention Needed' : 'Good Progress'}
            </div>
          </div>
          <h3 className="text-lg font-medium text-sypher-black mb-1.5">{title}</h3>
          <p className="text-sm text-sypher-gray-dark/80 mb-3">{description}</p>
          
          {actionText && onAction && (
            <button 
              onClick={onAction}
              className="flex items-center text-sm font-medium text-sypher-blue-dark hover:text-sypher-blue-accent transition-colors"
            >
              {actionText}
              <ArrowUpRight size={16} className="ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
