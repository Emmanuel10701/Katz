'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FiUser, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiLogIn, 
  FiShield,
  FiSettings,
  FiDatabase,
  FiBarChart2,
  FiUsers,
  FiBook,
  FiMail,
  FiPhone,
  FiLoader
} from 'react-icons/fi';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const router = useRouter();

  // Fetch real stats from backend when component loads
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setStatsLoading(true);
        
        // Fetch all stats in parallel for better performance
        const [
          studentsRes,
          staffRes,
          subscribersRes,
          assignmentsRes,
          eventsRes
        ] = await Promise.allSettled([
          fetch('/api/student'),
          fetch('/api/staff'),
          fetch('/api/subscriber'),
          fetch('/api/assignment'),
          fetch('/api/events')
        ]);

        // Process responses
        const students = studentsRes.status === 'fulfilled' ? await studentsRes.value.json() : { students: [] };
        const staff = staffRes.status === 'fulfilled' ? await staffRes.value.json() : { staff: [] };
        const subscribers = subscribersRes.status === 'fulfilled' ? await subscribersRes.value.json() : { subscribers: [] };
        const assignments = assignmentsRes.status === 'fulfilled' ? await assignmentsRes.value.json() : { assignments: [] };
        const events = eventsRes.status === 'fulfilled' ? await eventsRes.value.json() : { events: [] };

        // Calculate real stats
        const activeStudents = students.students?.filter(s => s.status === 'Active').length || 0;
        const totalStudents = students.students?.length || 0;
        const activeAssignments = assignments.assignments?.filter(a => a.status === 'active').length || 0;
        const upcomingEvents = events.events?.filter(e => new Date(e.date) > new Date()).length || 0;

        setStats({
          totalStudents,
          activeStudents,
          totalStaff: staff.staff?.length || 0,
          totalSubscribers: subscribers.subscribers?.length || 0,
          activeAssignments,
          upcomingEvents,
          // Calculate classes today based on current day schedule
          classesToday: calculateTodaysClasses(events.events),
          pendingTasks: calculatePendingTasks(assignments.assignments)
        });

      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default stats if API fails
        setStats({
          totalStudents: 0,
          activeStudents: 0,
          totalStaff: 0,
          totalSubscribers: 0,
          activeAssignments: 0,
          upcomingEvents: 0,
          classesToday: 0,
          pendingTasks: 0
        });
      } finally {
        setStatsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  // Helper function to calculate today's classes
  const calculateTodaysClasses = (events = []) => {
    const today = new Date().toDateString();
    return events.filter(event => 
      new Date(event.date).toDateString() === today && 
      event.type === 'class'
    ).length;
  };

  // Helper function to calculate pending tasks
  const calculatePendingTasks = (assignments = []) => {
    return assignments.filter(assignment => 
      assignment.status === 'pending' || assignment.status === 'assigned'
    ).length;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (error) => {
    const errorMessage = error.message || error;
    
    if (errorMessage.toLowerCase().includes('user not found') || 
        errorMessage.toLowerCase().includes('user does not exist')) {
      return '❌ User not found. Please check your email address.';
    }
    
    if (errorMessage.toLowerCase().includes('invalid password') || 
        errorMessage.toLowerCase().includes('incorrect password')) {
      return '❌ Incorrect password. Please try again.';
    }
    
    if (errorMessage.toLowerCase().includes('network') || 
        errorMessage.toLowerCase().includes('fetch')) {
      return '❌ Network error. Please check your internet connection.';
    }
    
    return `❌ ${errorMessage}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = data.message || 'Login failed';
        
        if (response.status === 401) {
          errorMessage = 'Invalid email or password';
        } else if (response.status === 404) {
          errorMessage = 'User account not found';
        }
        
        throw new Error(errorMessage);
      }

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        toast.success('✅ Login successful! Redirecting to dashboard...');
        
        setTimeout(() => {
          router.push('/MainDashboard');
        }, 1500);
      } else {
        throw new Error(data.message || 'Login failed');
      }
      
    } catch (error) {
      console.error('Login error:', error);
      const userFriendlyError = getErrorMessage(error);
      toast.error(userFriendlyError, { autoClose: 6000 });
      setErrors({ submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const adminFeatures = [
    {
      icon: FiUsers,
      title: 'Student Management',
      description: `Manage ${stats?.totalStudents || 0} student records`
    },
    {
      icon: FiBook,
      title: 'Academic Planning',
      description: `${stats?.activeAssignments || 0} active assignments`
    },
    {
      icon: FiBarChart2,
      title: 'Analytics Dashboard',
      description: 'Real-time performance insights'
    },
    {
      icon: FiDatabase,
      title: 'Data Management',
      description: `${stats?.totalStaff || 0} staff members`
    }
  ];

  // Real quick stats from API data
  const quickStats = stats ? [
    { 
      label: 'Active Students', 
      value: stats.activeStudents.toLocaleString(),
      description: `Total: ${stats.totalStudents} students`
    },
    { 
      label: 'Teaching Staff', 
      value: stats.totalStaff.toLocaleString(),
      description: 'Faculty & administration'
    },
    { 
      label: 'Classes Today', 
      value: stats.classesToday.toString(),
      description: 'Scheduled sessions'
    },
    { 
      label: 'Pending Tasks', 
      value: stats.pendingTasks.toString(),
      description: 'Assignments & activities'
    }
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
        style={{ fontSize: '14px' }}
      />
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Login Form */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-xl mb-4">
                      <FiShield className="text-white text-2xl" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      Katwanyaa High School
                    </h1>
                    <p className="text-gray-600">
                      Admin Portal Login
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="Enter your email"
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full border ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg px-4 py-3 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                          placeholder="Enter your password"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 p-1"
                        >
                          {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                          disabled={isLoading}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        Remember me
                      </label>
                      <button
                        type="button"
                        disabled={isLoading}
                        className="text-blue-600 text-sm hover:text-blue-800 disabled:opacity-50"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <FiLogIn className="text-xl" />
                          Sign In
                        </>
                      )}
                    </button>

                    {errors.submit && (
                      <p className="text-red-500 text-center text-sm bg-red-50 py-2 rounded-lg">
                        {errors.submit}
                      </p>
                    )}
                  </form>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 text-blue-700 text-sm">
                      <FiShield className="text-green-600 flex-shrink-0" />
                      <span>Your login is secured with encryption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Information */}
            <div className="space-y-6">
              <div className="text-gray-800">
                <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
                  <FiUser className="text-blue-600" />
                  <span className="text-sm font-medium">School Administration</span>
                </div>

                <h2 className="text-3xl font-bold mb-4">
                  Manage Your School
                  <span className="block text-blue-600">
                    Efficiently
                  </span>
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Access comprehensive tools to manage academic operations, 
                  monitor student progress, and enhance institutional efficiency.
                </p>
              </div>

              {/* Quick Stats - Now with Real Data */}
              <div className="grid grid-cols-2 gap-4">
                {statsLoading ? (
                  // Loading skeleton
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                      <div className="animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  quickStats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-lg shadow border border-gray-200 p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="text-xl font-bold text-gray-800 mb-1">{stat.value}</div>
                      <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                      <div className="text-gray-500 text-xs mt-1">{stat.description}</div>
                    </div>
                  ))
                )}
              </div>

              {/* Features with Real Data */}
              <div className="grid sm:grid-cols-2 gap-4">
                {adminFeatures.map((feature, index) => (
                  <div
                    key={feature.title}
                    className="bg-white rounded-lg shadow border border-gray-200 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <feature.icon className="text-blue-600 text-lg" />
                      </div>
                      <h3 className="text-gray-800 font-semibold text-sm">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
                  <FiSettings className="text-blue-600" />
                  Need Help?
                </h3>
                <div className="space-y-2 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <FiMail className="text-blue-600" />
                    <span>support@katwanyaa.ac.ke</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiPhone className="text-green-600" />
                    <span>+254 700 000 000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}