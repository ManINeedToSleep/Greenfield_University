import React from 'react';
import { IconType } from 'react-icons';

interface Activity {
  id: string;
  title: string;
  timestamp: string;
  icon: IconType;
  type?: 'default' | 'warning' | 'success';
}

interface ActivityFeedProps {
  activities: Activity[];
  title: string;
}

export default function ActivityFeed({ activities, title }: ActivityFeedProps) {
  return (
    <section className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold text-emerald-900 mb-6">{title}</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-center p-3 bg-emerald-50 rounded-lg"
          >
            <activity.icon className="text-emerald-600 mr-3" />
            <div>
              <p className="font-medium text-gray-800">{activity.title}</p>
              <p className="text-sm text-gray-700">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 