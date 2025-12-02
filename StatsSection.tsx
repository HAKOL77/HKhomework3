import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface StatsSectionProps {
  data: { name: string; value: number }[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            stroke="#9ca3af" 
            tick={{ fill: '#9ca3af', fontSize: 12 }} 
            axisLine={{ stroke: '#4b5563' }}
            interval="preserveStartEnd"
          />
          <YAxis 
            stroke="#9ca3af" 
            tick={{ fill: '#9ca3af', fontSize: 12 }} 
            axisLine={{ stroke: '#4b5563' }}
            tickFormatter={(value) => `${Math.floor(value / 60)}m`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
            formatter={(value: number) => [`${Math.floor(value / 60)}분 ${value % 60}초`, '공부 시간']}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            name="실시간 공부 기록" 
            stroke="#8884d8" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#8884d8', strokeWidth: 0 }} 
            activeDot={{ r: 6, fill: '#fff' }} 
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};