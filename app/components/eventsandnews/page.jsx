'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiSearch, 
  FiEdit, 
  FiTrash2, 
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiClock,
  FiTag,
  FiChevronLeft,
  FiChevronRight,
  FiShare2,
  FiEye,
  FiHeart,
  FiX,
  FiImage,
  FiBook
} from 'react-icons/fi';

export default function NewsEventsManager() {
  const [activeSection, setActiveSection] = useState('news'); // 'news' or 'events'
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [formData, setFormData] = useState({
    type: 'news',
    title: '',
    date: '',
    time: '',
    location: '',
    category: 'academic',
    description: '',
    content: '',
    image: '',
    featured: false,
    registration: false,
    attendees: '',
    speaker: '',
    author: '',
    status: 'draft'
  });

  useEffect(() => {
    // Load sample data
    const sampleNews = Array.from({ length: 18 }, (_, i) => ({
      id: `news-${i + 1}`,
      type: 'news',
      title: `News ${i + 1}: ${['KCSE Results', 'Sports Victory', 'Science Fair', 'New Infrastructure', 'Student Achievement', 'Community Outreach'][i % 6]}`,
      date: `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      category: ['achievement', 'sports', 'academic', 'infrastructure', 'community'][i % 5],
      description: 'Exciting news about school developments and student achievements that showcase our commitment to excellence.',
      content: `Detailed content about this news item...`,
      image: `https://images.unsplash.com/photo-15${i % 9}${i % 10}?w=400&h=250&fit=crop`,
      author: ['Principal Office', 'Sports Department', 'Academic Team', 'Admin Office'][i % 4],
      likes: Math.floor(Math.random() * 100) + 20,
      shares: Math.floor(Math.random() * 50) + 5,
      views: Math.floor(Math.random() * 1000) + 200,
      featured: i % 5 === 0,
      status: ['published', 'draft'][i % 2]
    }));

    const sampleEvents = Array.from({ length: 12 }, (_, i) => ({
      id: `event-${i + 1}`,
      type: 'event',
      title: `Event ${i + 1} - ${['Science Fair', 'Sports Day', 'Music Festival', 'Career Day', 'Cultural Day', 'Parents Meeting'][i % 6]}`,
      date: `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      time: `${['9:00 AM', '2:00 PM', '10:00 AM', '3:00 PM'][i % 4]} - ${['12:00 PM', '5:00 PM', '1:00 PM', '6:00 PM'][i % 4]}`,
      location: ['Main Hall', 'Sports Ground', 'Science Building', 'Auditorium', 'Library'][i % 5],
      category: ['academic', 'sports', 'cultural', 'social'][i % 4],
      description: 'Exciting event with various activities and guest speakers.',
      image: `https://images.unsplash.com/photo-15${i % 9}${i % 10}?w=400&h=200&fit=crop`,
      featured: i % 4 === 0,
      registration: i % 3 === 0,
      attendees: Math.floor(Math.random() * 500) + 50,
      speaker: `Dr. ${['Jane Mwangi', 'John Kamau', 'Sarah Chen', 'David Omondi'][i % 4]}`,
      status: ['upcoming', 'ongoing', 'completed'][i % 3]
    }));

    setNews(sampleNews);
    setEvents(sampleEvents);
    setFilteredItems(sampleNews);
  }, []);

  useEffect(() => {
    const items = activeSection === 'news' ? news : events;
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [activeSection, searchTerm, selectedCategory, news, events]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // CRUD Operations
  const handleCreate = () => {
    setFormData({
      type: activeSection,
      title: '',
      date: '',
      time: '',
      location: '',
      category: activeSection === 'news' ? 'achievement' : 'academic',
      description: '',
      content: '',
      image: '',
      featured: false,
      registration: false,
      attendees: '',
      speaker: '',
      author: '',
      status: 'draft'
    });
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setFormData({ ...item });
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      if (activeSection === 'news') {
        setNews(news.filter(item => item.id !== id));
      } else {
        setEvents(events.filter(item => item.id !== id));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      // Update existing item
      if (activeSection === 'news') {
        setNews(news.map(item => item.id === editingItem.id ? { ...formData, id: editingItem.id } : item));
      } else {
        setEvents(events.map(item => item.id === editingItem.id ? { ...formData, id: editingItem.id } : item));
      }
    } else {
      // Create new item
      const newItem = {
        ...formData,
        id: `${activeSection}-${Date.now()}`,
        likes: 0,
        shares: 0,
        views: 0
      };
      if (activeSection === 'news') {
        setNews([...news, newItem]);
      } else {
        setEvents([...events, newItem]);
      }
    }
    setShowModal(false);
  };

  const categories = {
    news: [
      { value: 'achievement', label: 'Achievements', color: 'green' },
      { value: 'sports', label: 'Sports', color: 'blue' },
      { value: 'academic', label: 'Academic', color: 'purple' },
      { value: 'infrastructure', label: 'Infrastructure', color: 'orange' },
      { value: 'community', label: 'Community', color: 'red' }
    ],
    events: [
      { value: 'academic', label: 'Academic', color: 'blue' },
      { value: 'sports', label: 'Sports', color: 'green' },
      { value: 'cultural', label: 'Cultural', color: 'purple' },
      { value: 'social', label: 'Social', color: 'orange' }
    ]
  };

  const getCategoryColor = (category) => {
    const categoryList = categories[activeSection];
    const cat = categoryList.find(c => c.value === category);
    return cat ? cat.color : 'gray';
  };

  const Pagination = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <p className="text-sm text-gray-700">
        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} items
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <FiChevronLeft className="text-lg" />
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page => 
            page === 1 || 
            page === totalPages || 
            (page >= currentPage - 1 && page <= currentPage + 1)
          )
          .map((page, index, array) => (
            <div key={page} className="flex items-center">
              {index > 0 && array[index - 1] !== page - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <button
                onClick={() => paginate(page)}
                className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            </div>
          ))
        }

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <FiChevronRight className="text-lg" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            News & Events Manager
          </h1>
          <p className="text-gray-600 mt-2">Manage school news articles and events</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-4 lg:px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-purple-500/25 w-full lg:w-auto justify-center"
        >
          <FiPlus className="text-lg" />
          Create {activeSection === 'news' ? 'News' : 'Event'}
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl w-full max-w-md">
        {[
          { id: 'news', label: 'News Articles', count: news.length },
          { id: 'events', label: 'Events', count: events.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              activeSection === tab.id
                ? 'bg-white text-purple-600 shadow-lg'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <div className="flex items-center gap-2 justify-center">
              <span>{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeSection === tab.id ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-200/50">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeSection}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          >
            <option value="all">All Categories</option>
            {categories[activeSection].map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>

          <button className="px-4 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg">
            <FiShare2 className="text-lg" />
            <span className="hidden lg:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {currentItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden group cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${getCategoryColor(item.category)}-500 text-white backdrop-blur-sm`}>
                  {categories[activeSection].find(c => c.value === item.category)?.label}
                </span>
                {item.featured && (
                  <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-semibold backdrop-blur-sm">
                    Featured
                  </span>
                )}
              </div>

              {/* Stats */}
              {activeSection === 'news' ? (
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <FiEye className="text-xs" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiHeart className="text-xs" />
                      <span>{item.likes}</span>
                    </div>
                  </div>
                  <span className="text-xs opacity-90">{item.date}</span>
                </div>
              ) : (
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="flex items-center gap-1 text-sm">
                    <FiCalendar className="text-xs" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs opacity-90">
                    <FiUsers className="text-xs" />
                    <span>{item.attendees} attendees</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 lg:p-6">
              <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors text-sm lg:text-base">
                {item.title}
              </h3>
              
              <p className="text-gray-600 text-xs lg:text-sm mb-4 line-clamp-2">{item.description}</p>
              
              {activeSection === 'events' && (
                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiClock className="text-gray-400" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMapPin className="text-gray-400" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 lg:gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(item)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FiEdit className="text-sm lg:text-base" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 className="text-sm lg:text-base" />
                  </motion.button>
                </div>
                
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  item.status === 'published' || item.status === 'upcoming' 
                    ? 'bg-green-100 text-green-800' 
                    : item.status === 'draft'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {filteredItems.length > 0 && (
        <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-200/50">
          <Pagination />
        </div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 lg:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                    {editingItem ? 'Edit' : 'Create'} {activeSection === 'news' ? 'News' : 'Event'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="text-xl text-gray-600" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {categories[activeSection].map(category => (
                        <option key={category.value} value={category.value}>{category.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {activeSection === 'events' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Time
                        </label>
                        <input
                          type="text"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., 9:00 AM - 5:00 PM"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter location"
                        />
                      </div>
                    </>
                  )}

                  {activeSection === 'news' && (
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter author name"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter image URL"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Featured</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.status === 'published'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'published' : 'draft' })}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Publish Immediately</span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 lg:pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    {editingItem ? 'Update' : 'Create'} {activeSection === 'news' ? 'News' : 'Event'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}