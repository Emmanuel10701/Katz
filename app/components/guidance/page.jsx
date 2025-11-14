'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter,
  FiEdit3,
  FiTrash2,
  FiBook,
  FiBarChart2,
  FiUser,
  FiUsers,
  FiAlertTriangle,
  FiMessageCircle,
  FiClock,
  FiCalendar,
  FiMapPin,
  FiSave,
  FiX,
  FiEye,
  FiImage,
  FiVideo,
  FiLink,
  FiShare2,
  FiDownload
} from 'react-icons/fi';

// Modern Card Component with Image Support
const CounselingEventCard = ({ event, onEdit, onDelete, index }) => {
  const [imageError, setImageError] = useState(false);

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'linear-gradient(135deg, #EF4444, #DC2626)',
      high: 'linear-gradient(135deg, #F59E0B, #D97706)',
      medium: 'linear-gradient(135deg, #3B82F6, #2563EB)',
      low: 'linear-gradient(135deg, #10B981, #059669)'
    };
    return colors[priority] || 'linear-gradient(135deg, #6B7280, #4B5563)';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      academic: <FiBook className="text-blue-500" />,
      career: <FiBarChart2 className="text-green-500" />,
      personal: <FiUser className="text-purple-500" />,
      social: <FiUsers className="text-pink-500" />,
      crisis: <FiAlertTriangle className="text-red-500" />
    };
    return icons[category] || <FiMessageCircle className="text-gray-500" />;
  };

  const getCategoryColor = (category) => {
    const colors = {
      academic: 'bg-blue-100 text-blue-800 border-blue-200',
      career: 'bg-green-100 text-green-800 border-green-200',
      personal: 'bg-purple-100 text-purple-800 border-purple-200',
      social: 'bg-pink-100 text-pink-800 border-pink-200',
      crisis: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatTime = (time) => {
    return time ? time.replace(/:\d+$/, '') : ''; // Added null check
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/60 overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-pointer relative"
      onClick={onEdit}
    >
      {/* Premium Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Image Section */}
      {event?.image && !imageError ? (
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.counselor}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
          {/* Priority Badge on Image */}
          <div 
            className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
            style={{ background: getPriorityColor(event.priority) }}
          >
            {event.priority}
          </div>
        </div>
      ) : (
        // Fallback with gradient background when no image
        <div 
          className="h-32 relative overflow-hidden"
          style={{ background: getPriorityColor(event?.priority) }}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
            {event?.priority}
          </div>
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-bold text-lg">{event?.counselor}</h3>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 relative">
        {/* Category Badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${getCategoryColor(event?.category)}`}>
          {getCategoryIcon(event?.category)}
          {event?.category ? event.category.charAt(0).toUpperCase() + event.category.slice(1) : 'Unknown'}
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 min-h-12 line-clamp-2 leading-relaxed font-medium">
          {event?.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiCalendar className="text-gray-400 flex-shrink-0" />
            <span className="truncate">
              {event?.date ? new Date(event.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              }) : 'No date'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiClock className="text-gray-400 flex-shrink-0" />
            <span>{formatTime(event?.time)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiUser className="text-gray-400 flex-shrink-0" />
            <span className="truncate">{event?.studentName || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
            </div>
            <span className="capitalize">{event?.type || 'unknown'}</span>
          </div>
        </div>

        {/* Notes Preview */}
        {event?.notes && (
          <div className="bg-gray-50/80 rounded-2xl p-3 mb-4 border border-gray-200/50">
            <p className="text-xs text-gray-600 line-clamp-2">
              <strong>Notes:</strong> {event.notes}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl py-2.5 px-3 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold shadow-lg shadow-blue-500/25"
          >
            <FiEdit3 size={14} /> Edit
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl py-2.5 px-3 hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-semibold shadow-lg shadow-red-500/25"
          >
            <FiTrash2 size={14} /> Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Edit Dialog with Image Upload
const GuidanceEditDialog = ({ event, onSave, onCancel, showSnackbar }) => {
  const [formData, setFormData] = useState({
    counselor: '',
    category: 'academic',
    description: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    type: 'individual',
    priority: 'medium',
    studentName: '',
    studentClass: '',
    image: null
  });
  const [isSaving, setIsSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
      if (event.image) {
        setImagePreview(event.image);
      }
    }
  }, [event]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showSnackbar('Please upload an image file', 'error');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showSnackbar('Image size should be less than 5MB', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({ ...prev, image: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
  };

  const handleSave = async () => {
    if (!formData.counselor.trim() || !formData.description.trim()) {
      showSnackbar('Please fill in all required fields', 'error');
      return;
    }

    setIsSaving(true);
    try {
      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          if (key === 'image' && formData[key] instanceof File) {
            submitData.append('image', formData[key]);
          } else {
            submitData.append(key, formData[key]);
          }
        }
      });

      if (event?.id) submitData.append('id', event.id.toString());

      const response = await fetch('/api/guidance', {
        method: event ? 'PUT' : 'POST',
        body: submitData,
      });

      const result = await response.json();
      if (result.success) {
        onSave();
        showSnackbar(event ? 'Session updated successfully!' : 'Session created successfully!');
      } else {
        showSnackbar(result.error || 'An error occurred', 'error');
      }
    } catch (error) {
      showSnackbar('Error saving session', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-white/95 backdrop-blur-sm rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-8 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {event ? 'Edit Counseling Session' : 'New Counseling Session'}
              </h2>
              <p className="text-blue-100 opacity-90">
                {event ? 'Update session details' : 'Create a new counseling session'}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCancel}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            >
              <FiX size={24} />
            </motion.button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image & Basic Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Image Upload */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200/50">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Session Image</label>
                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative group">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-2xl shadow-lg"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={removeImage}
                        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                      >
                        <FiX size={16} />
                      </motion.button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors group">
                      <FiImage className="mx-auto text-gray-400 text-3xl mb-3 group-hover:text-blue-500" />
                      <p className="text-gray-500 text-sm mb-3">Click to upload image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200/50">
                <h3 className="font-semibold text-gray-700 mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">
                      {event ? new Date(event.createdAt).toLocaleDateString() : 'New'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">
                      {event ? new Date(event.updatedAt).toLocaleDateString() : 'Never'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Counselor Name *</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    value={formData.counselor}
                    onChange={(e) => updateField('counselor', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80"
                    placeholder="Enter counselor name"
                    required
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80"
                    disabled={isSaving}
                  >
                    <option value="academic">📚 Academic</option>
                    <option value="career">💼 Career</option>
                    <option value="personal">👤 Personal</option>
                    <option value="social">👥 Social</option>
                    <option value="crisis">🚨 Crisis</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Session Description *</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    rows={3}
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 resize-none"
                    placeholder="Describe the counseling session..."
                    required
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Student Name</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => updateField('studentName', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80"
                    placeholder="Optional"
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Student Class</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    value={formData.studentClass}
                    onChange={(e) => updateField('studentClass', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80"
                    placeholder="Optional"
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Date *</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateField('date', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80"
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Time *</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="time"
                    value={formData.time}
                    onChange={(e) => updateField('time', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80"
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Session Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => updateField('type', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80"
                    disabled={isSaving}
                  >
                    <option value="individual">👤 Individual</option>
                    <option value="group">👥 Group</option>
                    <option value="workshop">🎯 Workshop</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Priority *</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => updateField('priority', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80"
                    disabled={isSaving}
                  >
                    <option value="low">💚 Low</option>
                    <option value="medium">💛 Medium</option>
                    <option value="high">🧡 High</option>
                    <option value="urgent">❤️ Urgent</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Additional Notes</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80 resize-none"
                    placeholder="Any additional notes or comments..."
                    disabled={isSaving}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="flex justify-between items-center p-8 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-gray-100/80">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            disabled={isSaving}
            className="px-8 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded-2xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 bg-white shadow-lg hover:shadow-xl"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl px-8 py-3 font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
          >
            {isSaving ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Saving...
              </>
            ) : (
              <>
                <FiSave />
                {event ? 'Update Session' : 'Create Session'}
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Component with Enhanced Features
export default function GuidanceCounselingTab({ events = [], onUpdate, showSnackbar }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Ensure events is always an array
  const safeEvents = Array.isArray(events) ? events : [];

  const handleNewEvent = () => {
    setCurrentEvent(null);
    setIsEditing(true);
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this counseling session? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/guidance?id=${id}`, { 
          method: 'DELETE' 
        });
        const result = await response.json();
        if (result.success) {
          onUpdate?.();
          showSnackbar?.('Counseling session deleted successfully!');
        } else {
          showSnackbar?.(result.error || 'Error deleting session', 'error');
        }
      } catch (error) {
        showSnackbar?.('Error deleting session', 'error');
      }
    }
  };

  // Fixed filter function with null checks
  const filteredEvents = safeEvents.filter(event => {
    if (!event) return false;
    
    const matchesSearch = 
      (event.counselor?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (event.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (event.studentName?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || event.priority === filterPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Stats for the header with null checks
  const stats = {
    total: safeEvents.length,
    urgent: safeEvents.filter(e => e?.priority === 'urgent').length,
    today: safeEvents.filter(e => e?.date && new Date(e.date).toDateString() === new Date().toDateString()).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-2xl">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -100, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 15 + i * 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute text-white/10 text-9xl"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 20}%`,
                  }}
                >
                  💬
                </motion.div>
              ))}
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
              <div className="lg:col-span-2">
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent"
                >
                  Guidance & Counseling
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-cyan-100 text-lg sm:text-xl opacity-90 mb-6"
                >
                  Manage student counseling sessions with modern tools and insights
                </motion.p>

                {/* Stats */}
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{stats.total}</div>
                    <div className="text-cyan-100 text-sm">Total Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-200">{stats.urgent}</div>
                    <div className="text-cyan-100 text-sm">Urgent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-200">{stats.today}</div>
                    <div className="text-cyan-100 text-sm">Today</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNewEvent}
                  className="w-full bg-white/20 backdrop-blur-sm text-white rounded-2xl px-6 py-4 font-bold hover:bg-white/30 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 text-lg border border-white/20 group"
                >
                  <FiPlus className="group-hover:rotate-90 transition-transform duration-300" />
                  Create New Session
                </motion.button>

                {/* View Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-white/30 text-white shadow-inner' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    Grid View
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-white/30 text-white shadow-inner' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    List View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <div className="md:col-span-2">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  placeholder="Search sessions, counselors, or students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80"
                />
              </div>
            </div>
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80"
              >
                <option value="all">All Categories</option>
                <option value="academic">Academic</option>
                <option value="career">Career</option>
                <option value="personal">Personal</option>
                <option value="social">Social</option>
                <option value="crisis">Crisis</option>
              </select>
            </div>
            <div>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/80"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                  setFilterPriority('all');
                }}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-2xl px-4 py-3.5 font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                <FiFilter /> Clear
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Sessions Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          key={viewMode}
        >
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredEvents.map((event, index) => (
                  <CounselingEventCard 
                    key={event?.id || index}
                    event={event}
                    index={index}
                    onEdit={() => handleEdit(event)}
                    onDelete={() => handleDelete(event?.id)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event?.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => handleEdit(event)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">
                          {event?.category === 'academic' && '📚'}
                          {event?.category === 'career' && '💼'}
                          {event?.category === 'personal' && '👤'}
                          {event?.category === 'social' && '👥'}
                          {event?.category === 'crisis' && '🚨'}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{event?.counselor}</h3>
                          <p className="text-gray-600 text-sm">{event?.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {event?.date ? new Date(event.date).toLocaleDateString() : 'No date'} at {event?.time}
                        </div>
                        <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold text-white ${
                          event?.priority === 'urgent' ? 'bg-red-500' :
                          event?.priority === 'high' ? 'bg-orange-500' :
                          event?.priority === 'medium' ? 'bg-blue-500' : 'bg-green-500'
                        }`}>
                          {event?.priority}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-16 text-center"
            >
              <div className="text-8xl mb-6">💬</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No counseling sessions found</h3>
              <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                {searchTerm || filterCategory !== 'all' || filterPriority !== 'all' 
                  ? 'No sessions match your current filters. Try adjusting your search criteria.' 
                  : 'Start building your counseling program by creating the first session.'
                }
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNewEvent}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl px-8 py-4 font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-2xl flex items-center gap-3 mx-auto text-lg"
              >
                <FiPlus /> Create Your First Session
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Edit Dialog */}
      <AnimatePresence>
        {isEditing && (
          <GuidanceEditDialog
            event={currentEvent}
            onSave={() => {
              setIsEditing(false);
              setCurrentEvent(null);
              onUpdate?.();
            }}
            onCancel={() => {
              setIsEditing(false);
              setCurrentEvent(null);
            }}
            showSnackbar={showSnackbar}
          />
        )}
      </AnimatePresence>
    </div>
  );
}