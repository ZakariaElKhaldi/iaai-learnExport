"use client";

// Sample data for charts
export const revenueData = {
  monthly: {
    data: [4500, 5200, 4800, 5700, 6200, 5800, 6500, 7200, 6800, 7500, 8200, 9000],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  courseRevenue: {
    data: [3200, 2450, 1800, 1200, 950, 650],
    labels: ['Web Dev', 'React', 'Node.js', 'Python', 'UI/UX', 'DevOps']
  },
  revenueBreakdown: {
    data: [42000, 18500, 12000, 8500],
    labels: ['Course Sales', 'Subscriptions', 'Consultations', 'Other']
  },
  revenueVsExpenses: {
    revenue: [4500, 5200, 4800, 5700, 6200, 5800, 6500, 7200, 6800, 7500, 8200, 9000],
    expenses: [3200, 3500, 3300, 3800, 4100, 3900, 4200, 4600, 4400, 4800, 5100, 5400],
    profit: [1300, 1700, 1500, 1900, 2100, 1900, 2300, 2600, 2400, 2700, 3100, 3600],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  quarterlyGrowth: {
    data: [12, 18, 15, 22],
    labels: ['Q1', 'Q2', 'Q3', 'Q4']
  }
};

export const enrollmentData = {
  newStudents: {
    data: [120, 145, 132, 155, 180, 172, 190, 210, 195, 225, 240, 255],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  activeStudents: {
    data: [850, 920, 880, 950, 1020, 980, 1050, 1120, 1080, 1150, 1220, 1180],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  courseCategories: {
    data: [1450, 950, 750, 550, 320, 220],
    labels: ['Web Dev', 'React', 'Node.js', 'Python', 'UI/UX', 'DevOps']
  },
  enrollmentVsCompletion: {
    enrollment: [120, 145, 132, 155, 180, 172, 190, 210, 195, 225, 240, 255],
    completion: [85, 102, 93, 110, 125, 120, 135, 148, 138, 160, 170, 180],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  enrollmentByDevice: {
    data: [45, 30, 25],
    labels: ['Mobile', 'Desktop', 'Tablet']
  },
  enrollmentByRegion: {
    data: [35, 25, 15, 10, 8, 7],
    labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania']
  }
};

export const engagementData = {
  studentActivity: {
    data: [45, 52, 48, 57, 62, 58, 65, 72, 68, 75, 82, 78],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  completionRates: {
    data: [85, 75, 65, 55, 45, 35],
    labels: ['Web Dev', 'React', 'Node.js', 'Python', 'UI/UX', 'DevOps']
  },
  sessionDuration: {
    data: [35, 42, 38, 45, 50, 48, 52, 58, 55, 60, 65, 62],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  engagementByDay: {
    data: [68, 75, 82, 78, 85, 65, 55],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  engagementByHour: {
    data: [15, 20, 25, 35, 45, 60, 75, 85, 90, 95, 85, 80, 75, 70, 65, 60, 70, 80, 75, 60, 45, 35, 25, 20],
    labels: Array.from({length: 24}, (_, i) => `${i}:00`)
  },
  engagementMetrics: {
    watchTime: [42, 48, 45, 52, 58, 55, 60, 65, 62, 68, 72, 70],
    quizAttempts: [85, 95, 90, 100, 110, 105, 115, 125, 120, 130, 140, 135],
    comments: [25, 30, 28, 32, 35, 33, 38, 42, 40, 45, 48, 46],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
};

export const contentData = {
  contentViews: {
    data: [2450, 1850, 2100, 1650, 1250, 950],
    labels: ['Videos', 'Articles', 'Quizzes', 'Exercises', 'Projects', 'Downloads']
  },
  ratingDistribution: {
    data: [25, 120, 350, 1200, 1550],
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars']
  },
  contentPerformance: {
    views: [1200, 1450, 1350, 1550, 1700, 1600, 1800, 1950, 1850, 2050, 2200, 2100],
    likes: [450, 520, 490, 560, 610, 580, 650, 700, 670, 740, 790, 760],
    shares: [120, 140, 130, 150, 165, 155, 175, 190, 180, 200, 215, 205],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  contentTypePerformance: {
    completion: [85, 65, 75, 70, 55, 60],
    engagement: [75, 80, 70, 65, 60, 50],
    satisfaction: [90, 85, 80, 75, 70, 65],
    labels: ['Videos', 'Articles', 'Quizzes', 'Exercises', 'Projects', 'Downloads']
  }
};

// Top courses data
export const topCoursesData = [
  { name: 'Introduction to Web Development', students: 1200, growth: 12 },
  { name: 'Advanced React Patterns', students: 950, growth: 8 },
  { name: 'Node.js API Development', students: 750, growth: -3 },
  { name: 'Python for Data Science', students: 650, growth: 5 },
  { name: 'UI/UX Design Principles', students: 550, growth: 10 }
];

// Top rated content data
export const topRatedContentData = [
  { name: 'JavaScript Fundamentals', rating: 4.9, views: 2450 },
  { name: 'CSS Grid Layout', rating: 4.8, views: 1850 },
  { name: 'React Hooks Introduction', rating: 4.7, views: 2100 },
  { name: 'Building RESTful APIs', rating: 4.6, views: 1750 },
  { name: 'Responsive Design Workshop', rating: 4.5, views: 1650 }
];

// Performance metrics
export const performanceMetrics = {
  totalRevenue: '$12,450',
  totalStudents: '3,245',
  totalCourses: '5',
  avgRating: '4.8',
  completionRate: '72%',
  enrollmentRate: '3.2%',
  refundRate: '0.5%',
  activeStudents: '1,845',
  monthlyRevenue: '$2,450',
  avgRevenuePerStudent: '$38.40',
  avgWatchTime: '45 min',
  avgSessionsPerUser: '4.2',
  totalContentHours: '42h 15m',
  totalLectures: '245',
  contentEngagement: '78%',
  newStudents: '245',
  studentSatisfaction: '92%'
}; 