import React from 'react';
import { IconType } from 'react-icons';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  trend?: {
    value: number;
    isUpward: boolean;
  };
  className?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, className = '' }: StatCardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-700 text-sm font-medium">{title}</h3>
        <Icon className="text-emerald-600 text-xl" />
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-emerald-900">{value}</span>
        {trend && (
          <span className={`flex items-center ${
            trend.isUpward ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.isUpward ? '↑' : '↓'} {trend.value}%
          </span>
        )}
      </div>
    </div>
  );
} 