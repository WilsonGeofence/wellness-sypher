
import React, { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps
} from 'recharts';

type DataPoint = {
  date: string;
  value: number;
};

type TrendChartProps = {
  data: DataPoint[];
  dataKey?: string;
  color?: string;
  title: string;
  unit?: string;
  interval?: number;
};

const CustomTooltip = ({ active, payload, label, unit }: TooltipProps<number, string> & { unit?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-2 border-0 text-sm shadow-sm">
        <p className="text-sypher-black font-medium">{label}</p>
        <p className="text-sypher-blue-accent">
          {`${payload[0].value} ${unit || ''}`}
        </p>
      </div>
    );
  }
  return null;
};

const TrendChart: React.FC<TrendChartProps> = ({
  data,
  dataKey = 'value',
  color = '#3182CE',
  title,
  unit = '',
  interval = 0
}) => {
  const [animatedData, setAnimatedData] = useState<DataPoint[]>([]);
  
  useEffect(() => {
    // Progressive animation for chart data
    setAnimatedData([]);
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className="glass-card p-5 h-full animate-fade-in">
      <h3 className="font-medium text-lg text-sypher-black mb-4">{title}</h3>
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={animatedData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#718096' }} 
              tickLine={{ stroke: '#E2E8F0' }}
              axisLine={{ stroke: '#E2E8F0' }}
              interval={interval}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#718096' }} 
              tickLine={{ stroke: '#E2E8F0' }}
              axisLine={{ stroke: '#E2E8F0' }}
              unit={unit}
            />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4, strokeDasharray: '' }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
