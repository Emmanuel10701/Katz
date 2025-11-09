'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiMail, 
  FiTrash2, 
  FiUser,
  FiCalendar,
  FiFilter,
  FiDownload,
  FiTrendingUp,
  FiEye,
  FiSend
} from 'react-icons/fi';

export default function SubscriberManager() {
  const [subscribers, setSubscribers] = useState([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const sampleSubscribers = Array.from({ length: 125 }, (_, i) => ({
      id: i + 1,
      email: `subscriber${i + 1}@email.com`,
      name: `Subscriber ${i + 1}`,
      type: ['Parent', 'Student', 'Alumni', 'Community'][Math.floor(Math.random() * 4)],
      subscriptionDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      status: ['Active', 'Active', 'Active', 'Inactive'][Math.floor(Math.random() * 4)],
      lastEngagement: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      engagementScore: Math.floor(Math.random() * 100),
      source: ['Website', 'Event', 'Referral', 'Social Media'][Math.floor(Math.random() * 4)]
    }));
    setSubscribers(sampleSubscribers);
    setFilteredSubscribers(sampleSubscribers);
  }, []);

  const subscriberTypes = [
    { value: 'Parent', label: 'Parents', count: 45, color: 'blue' },
    { value: 'Student', label: 'Students', count: 35, color: 'green' },
    { value: 'Alumni', label: 'Alumni', count: 25, color: 'purple' },
    { value: 'Community', label: 'Community', count: 20, color: 'orange' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Subscriber Management
          </h1>
          <p className="text-gray-600 mt-2">Manage newsletter subscribers and email lists</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-indigo-500/25"
          >
            <FiDownload className="text-lg" />
            Export List
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-green-500/25"
          >
            <FiSend className="text-lg" />
            Send Campaign
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Total Subscribers</p>
              <p className="text-3xl font-bold mt-2">2,345</p>
            </div>
            <FiMail className="text-2xl text-indigo-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Today</p>
              <p className="text-3xl font-bold mt-2">156</p>
            </div>
            <FiUser className="text-2xl text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Open Rate</p>
              <p className="text-3xl font-bold mt-2">68%</p>
            </div>
            <FiEye className="text-2xl text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Growth</p>
              <p className="text-3xl font-bold mt-2">+12%</p>
            </div>
            <FiTrendingUp className="text-2xl text-orange-200" />
          </div>
        </div>
      </div>

      {/* Subscriber Types */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {subscriberTypes.map((type) => (
          <motion.div
            key={type.value}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 text-center group cursor-pointer"
          >
            <div className={`w-16 h-16 rounded-2xl bg-${type.color}-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
              <FiUser className={`text-2xl text-${type.color}-600`} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{type.count}</h3>
            <p className="text-gray-600">{type.label}</p>
            <div className={`mt-3 text-sm text-${type.color}-600 font-semibold`}>
              {Math.round((type.count / 125) * 100)}% of total
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscribers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            >
              <option value="all">All Types</option>
              {subscriberTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>

            <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
              <FiFilter className="text-lg" />
              Filter
            </button>

            <button className="px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg">
              <FiDownload className="text-lg" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscriber</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscription Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Engagement</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubscribers.slice(0, 10).map((subscriber) => (
                <motion.tr
                  key={subscriber.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {subscriber.name}
                      </p>
                      <p className="text-sm text-gray-500">{subscriber.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      subscriber.type === 'Parent' ? 'bg-blue-100 text-blue-800' :
                      subscriber.type === 'Student' ? 'bg-green-100 text-green-800' :
                      subscriber.type === 'Alumni' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {subscriber.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiCalendar className="text-gray-400" />
                      {subscriber.subscriptionDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${subscriber.engagementScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{subscriber.engagementScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      subscriber.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Send Email"
                      >
                        <FiSend className="text-lg" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove"
                      >
                        <FiTrash2 className="text-lg" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}