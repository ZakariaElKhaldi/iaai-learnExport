"use client";

import React from 'react';
import { BookOpen, Calendar, MessageSquare, Award, TrendingUp, Clock } from 'lucide-react';

export default function UserDashboardPage() {
  // Sample dashboard data
  const stats = [
    { title: 'Courses Enrolled', value: '12', icon: BookOpen, change: '+2 this month' },
    { title: 'Completed Courses', value: '8', icon: Award, change: '+1 this week' },
    { title: 'Upcoming Sessions', value: '3', icon: Calendar, change: 'Next: Tomorrow' },
    { title: 'Active Discussions', value: '5', icon: MessageSquare, change: '2 unread messages' },
  ];

  // Sample recent activity
  const recentActivity = [
    { type: 'course', title: 'Completed Module 3 in Advanced JavaScript', time: '2 hours ago' },
    { type: 'consultation', title: 'Booked a session with Dr. Smith', time: 'Yesterday' },
    { type: 'certificate', title: 'Earned React Fundamentals Certificate', time: '3 days ago' },
    { type: 'forum', title: 'Replied to thread: "Best practices for state management"', time: '1 week ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="bg-white rounded-lg border shadow-sm p-4">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  {activity.type === 'course' && <BookOpen className="h-4 w-4 text-primary" />}
                  {activity.type === 'consultation' && <Calendar className="h-4 w-4 text-primary" />}
                  {activity.type === 'certificate' && <Award className="h-4 w-4 text-primary" />}
                  {activity.type === 'forum' && <MessageSquare className="h-4 w-4 text-primary" />}
                </div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recommended For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="h-40 bg-gray-100"></div>
              <div className="p-4">
                <h3 className="font-semibold">Advanced Course {index + 1}</h3>
                <p className="text-sm text-muted-foreground mt-1">Learn advanced techniques and best practices</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm font-medium">4.8 ★★★★★</div>
                  <button className="text-sm text-primary font-medium">View Course</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Tracking */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Learning Progress</h2>
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">Current Course: Advanced React Patterns</h3>
              <p className="text-sm text-muted-foreground">Module 4 of 8</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">On track</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>45% completed</span>
            <span>100%</span>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Est. completion: 2 weeks</span>
            </div>
            <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium">Continue Learning</button>
          </div>
        </div>
      </div>
    </div>
  );
}