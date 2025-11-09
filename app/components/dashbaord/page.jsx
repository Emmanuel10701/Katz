'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiBook, 
  FiCalendar,
  FiFileText,
  FiTrendingUp,
  FiTrendingDown,
  FiEye,
  FiDownload,
  FiMail,
  FiUserPlus,
  FiArrowUpRight,
  FiStar
} from 'react-icons/fi';
import { 
  IoPeopleCircle,
  IoNewspaper,
  IoSparkles
} from 'react-icons/io5';

export default function DashboardOverview({ stats }) {
  const [recentActivity, setRecentActivity] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [quickStats, setQuickStats] = useState([]);

  useEffect(() => {
    setRecentActivity([
      { id: 1, action: 'New student registered', target: 'Brian Maina - Form 1', time: '2 hours ago', type: 'student', icon: FiUserPlus, color: 'emerald' },
      { id: 2, action: 'Assignment created', target: 'Mathematics Form 1', time: '5 hours ago', type: 'assignment', icon: FiBook, color: 'blue' },
      { id: 3, action: 'Event published', target: 'Science Fair 2024', time: '1 day ago', type: 'event', icon: FiCalendar, color: 'purple' },
      { id: 4, action: 'Newsletter sent', target: '2345 subscribers', time: '2 days ago', type: 'email', icon: FiMail, color: 'orange' }
    ]);

    setPerformanceData([
      { label: 'Academic Performance', value: 87, change: 5, color: 'green' },
      { label: 'Student Engagement', value: 92, change: 3, color: 'blue' },
      { label: 'Parent Satisfaction', value: 78, change: 8, color: 'purple' },
      { label: 'Staff Performance', value: 85, change: 6, color: 'orange' }
    ]);

    setQuickStats([
      { label: 'Avg. Test Score', value: '84%', change: 2.5, icon: FiTrendingUp, color: 'green' },
      { label: 'Attendance Rate', value: '96%', change: 1.2, icon: FiTrendingUp, color: 'blue' },
      { label: 'Graduation Rate', value: '98%', change: 0.8, icon: FiTrendingUp, color: 'purple' }
    ]);
  }, []);

  const StatCard = ({ icon: Icon, label, value, change, color, subtitle, trend }) => (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200/50 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full -translate-y-10 translate-x-10 opacity-50 group-hover:opacity-70 transition-opacity"></div>
      
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value.toLocaleString()}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          {change && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <FiTrendingUp className="text-green-500 text-sm" />
              ) : (
                <FiTrendingDown className="text-red-500 text-sm" />
              )}
              <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {change}% {trend === 'up' ? 'increase' : 'decrease'}
              </span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl bg-${color}-500/10 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`text-2xl text-${color}-600`} />
        </div>
      </div>
    </motion.div>
  );

  const PerformanceBar = ({ label, value, change, color }) => (
    <div className="flex items-center justify-between py-3">
      <span className="font-medium text-gray-700 text-sm">{label}</span>
      <div className="flex items-center gap-4 flex-1 max-w-xs">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`bg-${color}-500 h-2 rounded-full shadow-sm`}
          />
        </div>
        <div className="flex items-center gap-1 w-16">
          <span className="text-sm font-bold text-gray-800">{value}%</span>
          {change > 0 ? (
            <FiTrendingUp className="text-green-500 text-sm" />
          ) : (
            <FiTrendingDown className="text-red-500 text-sm" />
          )}
        </div>
      </div>
    </div>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6 overflow-hidden" // Added overflow-hidden here
    >
      {/* Welcome Section */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-8 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <IoSparkles className="text-2xl text-yellow-300" />
            </div>
            <h1 className="text-3xl font-bold">Welcome back, Admin!</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-2xl">
            Here's what's happening at Katwanyaa High School today. You have <span className="text-yellow-300 font-semibold">8 new notifications</span> and <span className="text-green-300 font-semibold">12 pending tasks</span>.
          </p>
          
          <div className="flex items-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg"
            >
              View Analytics
              <FiArrowUpRight className="text-lg" />
            </motion.button>
            <button className="text-white/80 hover:text-white px-6 py-3 rounded-xl font-semibold border border-white/20 hover:border-white/40 transition-colors">
              Quick Tour
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                <stat.icon className={`text-xl text-${stat.color}-600`} />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <FiTrendingUp className="text-green-500 text-sm" />
              <span className="text-green-600 text-sm font-semibold">+{stat.change}%</span>
              <span className="text-gray-500 text-sm ml-1">from last month</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon={FiUserPlus} 
          label="Total Students" 
          value={stats.totalStudents} 
          change={12} 
          trend="up"
          color="blue" 
          subtitle="1247 enrolled" 
        />
        <StatCard 
          icon={FiUsers} 
          label="Staff Members" 
          value={stats.totalStaff} 
          change={5} 
          trend="up"
          color="green" 
          subtitle="68 teaching staff" 
        />
        <StatCard 
          icon={FiMail} 
          label="Subscribers" 
          value={stats.totalSubscribers} 
          change={15} 
          trend="up"
          color="purple" 
          subtitle="Newsletter list" 
        />
        <StatCard 
          icon={FiBook} 
          label="Active Assignments" 
          value={stats.activeAssignments} 
          change={8} 
          trend="up"
          color="orange" 
          subtitle="45 ongoing" 
        />
        <StatCard 
          icon={FiCalendar} 
          label="Upcoming Events" 
          value={stats.upcomingEvents} 
          change={-3} 
          trend="down"
          color="red" 
          subtitle="8 scheduled" 
        />
        <StatCard 
          icon={FiMail} 
          label="Pending Emails" 
          value={stats.pendingEmails} 
          change={-2} 
          trend="down"
          color="indigo" 
          subtitle="To be sent" 
        />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FiStar className="text-yellow-500" />
              Recent Activity
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
              View All
              <FiArrowUpRight className="text-sm" />
            </button>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"> {/* Hide scrollbar for activity list */}
            {recentActivity.map((activity) => (
              <motion.div
                key={activity.id}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-${activity.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <activity.icon className={`text-xl text-${activity.color}-600`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.target}</p>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiTrendingUp className="text-green-500" />
            Performance Metrics
          </h2>
          <div className="space-y-1">
            {performanceData.map((metric, index) => (
              <PerformanceBar
                key={index}
                label={metric.label}
                value={metric.value}
                change={metric.change}
                color={metric.color}
              />
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Overall School Rating</span>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-gray-800">4.8/5.0</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Parent Satisfaction</span>
              <span className="font-semibold text-blue-600">94%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}