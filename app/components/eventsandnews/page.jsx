import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FiPlus, 
  FiSearch, 
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiClock,
  FiTag,
  FiChevronLeft,
  FiChevronRight,
  FiShare2,
  FiX,
  FiImage,
  FiBook,
  FiUpload,
  FiRotateCw,
  FiTrendingUp,
  FiAward,
  FiZap,
  FiEdit,
  FiTrash2
} from 'react-icons/fi';
import { 
  IoNewspaperOutline,
  IoCalendarClearOutline 
} from 'react-icons/io5';

// Import your local default images
import newsDefault from "../../../images/i.jpg";
import eventDefault from "../../../images/logo.jpg";

// Modern loading spinner component
const LoadingSpinner = ({ size = 'small', color = 'purple' }) => (
  <div className={`animate-spin rounded-full border-2 border-${color}-200 border-t-${color}-600 ${
    size === 'small' ? 'w-4 h-4' : 
    size === 'medium' ? 'w-6 h-6' : 
    'w-8 h-8'
  }`} />
);

// Modern badge component
const ModernBadge = ({ children, color = 'purple', variant = 'solid' }) => (
  <span className={`
    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
    ${variant === 'solid' 
      ? `bg-${color}-100 text-${color}-800` 
      : `bg-${color}-500 text-white`
    }
  `}>
    {children}
  </span>
);

// Modern card component
const ModernCard = ({ children, className = '', hover = true, onClick }) => (
  <div 
    onClick={onClick}
    className={`
      bg-white rounded-2xl shadow-lg border border-gray-200/50 
      backdrop-blur-sm bg-opacity-95 cursor-pointer
      ${hover ? 'hover:shadow-xl hover:border-gray-300/50 transition-all duration-300' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

// Modal component
const CustomModal = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 lg:p-8 border-b border-gray-200/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  {title.includes('News') ? 
                    <IoNewspaperOutline className="text-white text-xl" /> : 
                    <IoCalendarClearOutline className="text-white text-xl" />
                  }
                </div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                  {title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <FiX className="text-xl text-gray-600" />
              </button>
            </div>
          </div>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Button component
const CustomButton = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25",
    secondary: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400",
    danger: "bg-red-500 hover:bg-red-600 text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <LoadingSpinner size="small" />}
      {children}
    </motion.button>
  );
};

export default function NewsEventsManager() {
  const [activeSection, setActiveSection] = useState('news');
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

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

  // Enhanced categories with icons
  const categories = {
    news: [
      { value: 'achievement', label: 'Achievements', color: 'emerald', icon: FiAward },
      { value: 'sports', label: 'Sports', color: 'blue', icon: FiZap },
      { value: 'academic', label: 'Academic', color: 'purple', icon: FiBook },
      { value: 'infrastructure', label: 'Infrastructure', color: 'orange', icon: FiTrendingUp },
      { value: 'community', label: 'Community', color: 'rose', icon: FiUsers }
    ],
    events: [
      { value: 'academic', label: 'Academic', color: 'purple', icon: FiBook },
      { value: 'sports', label: 'Sports', color: 'blue', icon: FiZap },
      { value: 'cultural', label: 'Cultural', color: 'emerald', icon: FiAward },
      { value: 'social', label: 'Social', color: 'orange', icon: FiUsers }
    ]
  };

  // Enhanced fetch with modern error handling
  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      if (data.success) {
        setNews(data.news || []);
      } else {
        throw new Error(data.error || 'Failed to fetch news');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error(`📰 ${error.message}`);
      setNews([]);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      if (data.success) {
        setEvents(data.events || []);
      } else {
        throw new Error(data.error || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error(`📅 ${error.message}`);
      setEvents([]);
    }
  };

  const fetchData = async (showRefresh = false) => {
    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    
    try {
      await Promise.all([fetchNews(), fetchEvents()]);
      if (showRefresh) {
        toast.success('🔄 Data refreshed successfully!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (showRefresh) {
        toast.error('❌ Failed to refresh data');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const items = activeSection === 'news' ? news : events;
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [activeSection, searchTerm, selectedCategory, news, events]);

  // Enhanced pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modern file upload handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('📁 Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      toast.info('🖼️ Image selected successfully');
    }
  };

  // Enhanced CRUD Operations
  const handleCreate = () => {
    setFormData({
      type: activeSection,
      title: '',
      date: new Date().toISOString().split('T')[0], // Today's date as default
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
      author: 'School Administration',
      status: 'draft'
    });
    setImageFile(null);
    setImagePreview('');
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setFormData({ 
      ...item,
      description: item.excerpt || item.description,
      content: item.fullContent || item.content,
      author: item.author || 'School Administration'
    });
    setImagePreview(item.image || '');
    setImageFile(null);
    setEditingItem(item);
    setShowModal(true);
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const endpoint = activeSection === 'news' ? `/api/news/${id}` : `/api/events/${id}`;
        const response = await fetch(endpoint, {
          method: 'DELETE',
        });
        
        const result = await response.json();
        
        if (result.success) {
          await fetchData();
          toast.success(`🗑️ ${activeSection === 'news' ? 'News' : 'Event'} deleted successfully!`);
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error(`Error deleting ${activeSection}:`, error);
        toast.error(`❌ Failed to delete ${activeSection}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const submitData = new FormData();
      
      // Enhanced form data with validation
      submitData.append('title', formData.title.trim());
      submitData.append('category', formData.category);
      submitData.append('date', formData.date);
      submitData.append('featured', formData.featured.toString());

      if (activeSection === 'news') {
        submitData.append('excerpt', formData.description.trim());
        submitData.append('fullContent', (formData.content || formData.description).trim());
        submitData.append('author', formData.author.trim());
      } else {
        submitData.append('description', formData.description.trim());
        submitData.append('time', formData.time.trim());
        submitData.append('location', formData.location.trim());
        submitData.append('type', formData.category);
        submitData.append('attendees', formData.attendees || 'students');
        submitData.append('speaker', formData.speaker.trim());
      }

      if (imageFile) {
        submitData.append('image', imageFile);
      }

      let response;
      let endpoint;
      
      if (editingItem) {
        endpoint = activeSection === 'news' ? `/api/news/${editingItem.id}` : `/api/events/${editingItem.id}`;
        response = await fetch(endpoint, {
          method: 'PUT',
          body: submitData,
        });
      } else {
        endpoint = activeSection === 'news' ? '/api/news' : '/api/events';
        response = await fetch(endpoint, {
          method: 'POST',
          body: submitData,
        });
      }

      const result = await response.json();

      if (result.success) {
        await fetchData();
        setShowModal(false);
        toast.success(
          `✅ ${activeSection === 'news' ? 'News' : 'Event'} ${
            editingItem ? 'updated' : 'created'
          } successfully!`
        );
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error(`Error saving ${activeSection}:`, error);
      toast.error(`❌ ${error.message || `Failed to ${editingItem ? 'update' : 'create'} ${activeSection}`}`);
    } finally {
      setSaving(false);
    }
  };

  // Modern helper functions
  const getCategoryColor = (category) => {
    const categoryList = categories[activeSection];
    const cat = categoryList.find(c => c.value === category);
    return cat ? cat.color : 'gray';
  };

  const getImageUrl = (item) => {
    if (item.image) return item.image;
    return activeSection === 'news' ? newsDefault : eventDefault;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'emerald';
      case 'upcoming': return 'blue';
      case 'draft': return 'amber';
      case 'completed': return 'gray';
      default: return 'gray';
    }
  };

  // Modern Pagination Component
  const Pagination = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <p className="text-sm text-gray-600">
        Showing <span className="font-semibold">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredItems.length)}</span> of{' '}
        <span className="font-semibold">{filteredItems.length}</span> items
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
        >
          <FiChevronLeft className="text-lg text-gray-600" />
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
                <span className="px-2 text-gray-400">•••</span>
              )}
              <button
                onClick={() => paginate(page)}
                className={`px-3.5 py-2 rounded-xl font-semibold transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
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
          className="p-2 rounded-xl border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
        >
          <FiChevronRight className="text-lg text-gray-600" />
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/20 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <LoadingSpinner size="large" color="purple" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl"
            />
          </div>
          <p className="text-gray-600 text-lg mt-4 font-medium">Loading News & Events...</p>
          <p className="text-gray-400 text-sm mt-2">Preparing your content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/20 p-4 lg:p-6 space-y-6">
      <ToastContainer 
        position="top-right" 
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Enhanced Header */}
      <ModernCard hover={false}>
        <div className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  {activeSection === 'news' ? 
                    <IoNewspaperOutline className="text-white text-xl" /> : 
                    <IoCalendarClearOutline className="text-white text-xl" />
                  }
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    News & Events Manager
                  </h1>
                  <p className="text-gray-600 mt-1">Manage and organize school communications</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <CustomButton
                variant="secondary"
                onClick={() => fetchData(true)}
                disabled={refreshing}
                loading={refreshing}
              >
                <FiRotateCw className="text-lg" />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </CustomButton>
              
              <CustomButton
                variant="primary"
                onClick={handleCreate}
              >
                <FiPlus className="text-lg" />
                Create {activeSection === 'news' ? 'News' : 'Event'}
              </CustomButton>
            </div>
          </div>
        </div>
      </ModernCard>

      {/* Enhanced Tabs */}
      <ModernCard>
        <div className="p-4">
          <div className="flex space-x-1 bg-gray-100/50 p-1 rounded-xl w-full max-w-md">
            {[
              { id: 'news', label: 'News Articles', count: news.length, icon: IoNewspaperOutline },
              { id: 'events', label: 'Events', count: events.length, icon: IoCalendarClearOutline }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    activeSection === tab.id
                      ? 'bg-white text-purple-600 shadow-lg shadow-purple-500/10'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center gap-2 justify-center">
                    <Icon className={`text-lg ${
                      activeSection === tab.id ? 'text-purple-500' : 'text-gray-400'
                    }`} />
                    <span>{tab.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activeSection === tab.id ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </ModernCard>

      {/* Enhanced Filters */}
      <ModernCard>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder={`Search ${activeSection} by title, description, or author...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories[activeSection].map(category => {
                const Icon = category.icon;
                return (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                );
              })}
            </select>

            <CustomButton variant="secondary">
              <FiShare2 className="text-lg" />
              <span className="hidden lg:inline">Export Data</span>
            </CustomButton>
          </div>
        </div>
      </ModernCard>

      {/* Enhanced Items Grid */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => {
            const categoryInfo = categories[activeSection].find(c => c.value === item.category);
            const CategoryIcon = categoryInfo?.icon;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <ModernCard 
                  className="h-full overflow-hidden"
                  onClick={() => handleView(item)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImageUrl(item)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    
                    {/* Enhanced Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                        {CategoryIcon && <CategoryIcon className="text-xs" />}
                        <span>{categoryInfo?.label}</span>
                      </div>
                      {item.featured && (
                        <div className="px-2.5 py-1.5 bg-yellow-500/90 backdrop-blur-sm text-white rounded-full text-xs font-medium flex items-center gap-1">
                          <FiAward className="text-xs" />
                          <span>Featured</span>
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                        <FiCalendar className="text-xs opacity-80" />
                        <span>
                          {new Date(item.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: activeSection === 'news' ? 'numeric' : undefined
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 lg:p-6">
                    <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors text-base lg:text-lg leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {item.excerpt || item.description}
                    </p>
                    
                    {activeSection === 'events' && (
                      <div className="space-y-2 mb-4 text-sm">
                        {item.time && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FiClock className="text-gray-400 text-sm" />
                            <span>{item.time}</span>
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <FiMapPin className="text-gray-400 text-sm" />
                            <span className="line-clamp-1">{item.location}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <CustomButton
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(item);
                          }}
                          className="p-2"
                        >
                          <FiEdit className="text-base" />
                        </CustomButton>
                        <CustomButton
                          variant="danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          className="p-2"
                        >
                          <FiTrash2 className="text-base" />
                        </CustomButton>
                      </div>
                      
                      <ModernBadge color={getStatusColor(item.status)}>
                        {item.status || 'published'}
                      </ModernBadge>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <ModernCard>
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiBook className="text-3xl text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No {activeSection} found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search terms or filters to find what you\'re looking for.' 
                : `Get started by creating your first ${activeSection === 'news' ? 'news article' : 'event'}.`
              }
            </p>
            <CustomButton
              variant="primary"
              onClick={handleCreate}
            >
              <FiPlus className="text-lg" />
              Create {activeSection === 'news' ? 'News' : 'Event'}
            </CustomButton>
          </div>
        </ModernCard>
      )}

      {/* Enhanced Pagination */}
      {filteredItems.length > 0 && (
        <ModernCard>
          <div className="p-6">
            <Pagination />
          </div>
        </ModernCard>
      )}

      {/* Create/Edit Modal */}
      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`${editingItem ? 'Edit' : 'Create'} ${activeSection === 'news' ? 'News' : 'Event'}`}
      >
        <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">
          {/* Enhanced Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Featured Image
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50">
                  <img
                    src={imagePreview || getImageUrl(formData)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="block cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-200 flex items-center gap-3">
                    <FiUpload className="text-purple-500 text-xl" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        {imageFile ? 'Change Image' : 'Upload Image'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                    </div>
                  </div>
                </label>
                {imageFile && (
                  <p className="text-xs text-green-600 mt-2 font-medium">
                    ✓ {imageFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                placeholder="Enter a compelling title..."
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
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 appearance-none cursor-pointer"
              >
                {categories[activeSection].map(category => {
                  const Icon = category.icon;
                  return (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  );
                })}
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
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
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
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
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
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
                    placeholder="Enter event location"
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
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50"
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
              className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 resize-none"
              placeholder="Write a brief description..."
            />
          </div>

          {activeSection === 'news' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows="4"
                className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 resize-none"
                placeholder="Write the full article content..."
              />
            </div>
          )}

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-all duration-200 ${
                  formData.featured ? 'bg-purple-500' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${
                    formData.featured ? 'transform translate-x-5' : ''
                  }`} />
                </div>
              </div>
              <span className="text-sm font-semibold text-gray-700">Featured Item</span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200/60">
            <CustomButton
              type="button"
              variant="secondary"
              onClick={() => setShowModal(false)}
              className="flex-1"
            >
              <FiX className="text-lg" />
              Cancel
            </CustomButton>
            <CustomButton
              type="submit"
              variant="primary"
              loading={saving}
              disabled={saving}
              className="flex-1"
            >
              {editingItem ? <FiEdit className="text-lg" /> : <FiPlus className="text-lg" />}
              {editingItem ? 'Update' : 'Create'} {activeSection === 'news' ? 'News' : 'Event'}
            </CustomButton>
          </div>
        </form>
      </CustomModal>

      {/* View Item Modal */}
      <CustomModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title={selectedItem?.title || 'View Details'}
      >
        {selectedItem && (
          <div className="p-6 lg:p-8 space-y-6">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img
                src={getImageUrl(selectedItem)}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <FiCalendar className="text-gray-400" />
                <span>
                  {new Date(selectedItem.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FiTag className="text-gray-400" />
                <ModernBadge color={getCategoryColor(selectedItem.category)}>
                  {categories[activeSection].find(c => c.value === selectedItem.category)?.label}
                </ModernBadge>
              </div>

              {selectedItem.time && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FiClock className="text-gray-400" />
                  <span>{selectedItem.time}</span>
                </div>
              )}

              {selectedItem.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FiMapPin className="text-gray-400" />
                  <span>{selectedItem.location}</span>
                </div>
              )}

              {selectedItem.author && (
                <div className="flex items-center gap-2 text-gray-600">
                  <FiUsers className="text-gray-400" />
                  <span>By {selectedItem.author}</span>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {selectedItem.excerpt || selectedItem.description}
              </p>
            </div>

            {selectedItem.fullContent && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Full Content</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {selectedItem.fullContent}
                </p>
              </div>
            )}

            <div className="flex gap-4 pt-6 border-t border-gray-200/60">
              <CustomButton
                variant="secondary"
                onClick={() => {
                  setShowViewModal(false);
                  handleEdit(selectedItem);
                }}
                className="flex-1"
              >
                <FiEdit className="text-lg" />
                Edit
              </CustomButton>
              <CustomButton
                variant="primary"
                onClick={() => setShowViewModal(false)}
                className="flex-1"
              >
                Close
              </CustomButton>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
  );
}