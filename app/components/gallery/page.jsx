'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, FiSearch, FiEdit, FiTrash2, FiImage, FiFilter, FiDownload,
  FiX, FiEye, FiUpload, FiStar, FiGrid, FiList, FiChevronLeft,
  FiChevronRight, FiCheck, FiVideo, FiUser, FiCalendar, FiRotateCw,
  FiTag, FiFolder, FiInfo
} from 'react-icons/fi';

export default function GalleryManager() {
  // State
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAlbum, setSelectedAlbum] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set());

  const fileInputRef = useRef(null);
  const itemsPerPage = 12;

  // Form Data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'events',
    album: '',
    files: [],
    tags: [],
    featured: false
  });

  // Initialize sample data
  useEffect(() => {
    const sampleItems = Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      title: `Gallery Item ${i + 1}`,
      description: 'Beautiful school moment captured in high resolution',
      category: ['events', 'sports', 'academic', 'students'][i % 4],
      album: ['School Events', 'Sports Day', 'Academic Achievements', 'Campus Life'][i % 4],
      type: Math.random() > 0.8 ? 'video' : 'image',
      fileUrl: `https://images.unsplash.com/photo-15${i % 9}${i % 10}?w=600&h=400&fit=crop`,
      thumbnailUrl: `https://images.unsplash.com/photo-15${i % 9}${i % 10}?w=200&h=150&fit=crop`,
      fileName: `media-${i + 1}.${Math.random() > 0.8 ? 'mp4' : 'jpg'}`,
      fileSize: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
      fileType: Math.random() > 0.8 ? 'video/mp4' : 'image/jpeg',
      featured: i % 6 === 0,
      uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 50),
      tags: ['school', 'education', 'students'].slice(0, Math.floor(Math.random() * 3) + 1)
    }));
    setGalleryItems(sampleItems);
    setFilteredItems(sampleItems);
  }, []);

  // Extract unique albums and categories
  const albums = ['all', ...new Set(galleryItems.map(item => item.album).filter(Boolean))];
  const categories = [
    { value: 'all', label: 'All Categories', color: 'gray' },
    { value: 'events', label: 'Events', color: 'blue' },
    { value: 'sports', label: 'Sports', color: 'green' },
    { value: 'academic', label: 'Academic', color: 'purple' },
    { value: 'students', label: 'Students', color: 'pink' }
  ];

  // Filter items with useCallback for performance
  const filterItems = useCallback(() => {
    let filtered = galleryItems.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesAlbum = selectedAlbum === 'all' || item.album === selectedAlbum;
      
      return matchesSearch && matchesCategory && matchesAlbum;
    });

    return filtered;
  }, [galleryItems, searchTerm, selectedCategory, selectedAlbum]);

  useEffect(() => {
    setFilteredItems(filterItems());
    setCurrentPage(1);
  }, [filterItems]);

  // File handling with better validation
  const handleFilesSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type.startsWith('video/');
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB limit
      
      if (!isValidType) {
        alert(`File ${file.name} is not a supported image or video format`);
        return false;
      }
      if (!isValidSize) {
        alert(`File ${file.name} exceeds 50MB size limit`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      alert('Please select valid image or video files (max 50MB each)');
      return;
    }

    setFormData(prev => ({ 
      ...prev, 
      files: [...prev.files, ...validFiles].slice(0, 10) // Limit to 10 files
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelect(e.dataTransfer.files);
    }
  };

  const removeFile = (fileName) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(file => file.name !== fileName)
    }));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
  };

  // Enhanced CRUD Operations
  const handleCreate = async () => {
    if (!formData.title.trim() || formData.files.length === 0) {
      alert('Please provide a title and select at least one file');
      return;
    }

    setIsUploading(true);
    const newItems = [];

    for (const file of formData.files) {
      try {
        // Simulate upload progress with better UX
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
          setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
        }

        const newItem = {
          id: Date.now() + Math.random(),
          title: formData.files.length > 1 ? `${formData.title} - ${file.name}` : formData.title,
          description: formData.description,
          category: formData.category,
          album: formData.album || 'General',
          type: file.type.startsWith('image/') ? 'image' : 'video',
          fileUrl: URL.createObjectURL(file),
          thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : '/video-thumbnail.jpg',
          fileName: file.name,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          fileType: file.type,
          featured: formData.featured,
          uploadDate: new Date().toISOString(),
          views: 0,
          likes: 0,
          tags: formData.tags,
          dimensions: file.type.startsWith('image/') ? '1920x1080' : '1280x720'
        };

        newItems.push(newItem);
      } catch (error) {
        console.error('Error uploading file:', file.name, error);
        alert(`Failed to upload ${file.name}. Please try again.`);
      }
    }

    if (newItems.length > 0) {
      setGalleryItems(prev => [...newItems, ...prev]);
    }

    setIsUploading(false);
    setUploadProgress({});
    setShowModal(false);
    resetForm();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      album: item.album,
      files: [],
      tags: item.tags || [],
      featured: item.featured
    });
    setShowModal(true);
  };

  const handleUpdate = () => {
    if (!formData.title.trim()) {
      alert('Please provide a title');
      return;
    }

    setGalleryItems(prev => prev.map(item => 
      item.id === editingItem.id ? { ...item, ...formData } : item
    ));
    setShowModal(false);
    setEditingItem(null);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      setGalleryItems(prev => prev.filter(item => item.id !== id));
      setSelectedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      setImageErrors(prev => {
        const newErrors = new Set(prev);
        newErrors.delete(id);
        return newErrors;
      });
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.size === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedItems.size} selected items? This action cannot be undone.`)) {
      setGalleryItems(prev => prev.filter(item => !selectedItems.has(item.id)));
      setSelectedItems(new Set());
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'events',
      album: '',
      files: [],
      tags: [],
      featured: false
    });
    setUploadProgress({});
  };

  // Selection handling
  const toggleSelection = (id) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const selectAll = () => {
    setSelectedItems(selectedItems.size === currentItems.length ? new Set() : new Set(currentItems.map(item => item.id)));
  };

  // Image error handling
  const handleImageError = (id) => {
    setImageErrors(prev => new Set(prev).add(id));
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Stats
  const stats = {
    total: galleryItems.length,
    images: galleryItems.filter(item => item.type === 'image').length,
    videos: galleryItems.filter(item => item.type === 'video').length,
    featured: galleryItems.filter(item => item.featured).length,
    totalSize: galleryItems.reduce((acc, item) => {
      const size = parseFloat(item.fileSize);
      return acc + (isNaN(size) ? 0 : size);
    }, 0).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Media Gallery</h1>
          <p className="text-gray-600">Upload and manage images and videos from your computer</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            <FiUpload className="text-lg" />
            Upload Media
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Items', value: stats.total, icon: FiImage, color: 'blue' },
          { label: 'Images', value: stats.images, icon: FiImage, color: 'green' },
          { label: 'Videos', value: stats.videos, icon: FiVideo, color: 'red' },
          { label: 'Featured', value: stats.featured, icon: FiStar, color: 'yellow' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                <stat.icon className={`text-xl text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <select
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Albums</option>
            {albums.filter(album => album !== 'all').map(album => (
              <option key={album} value={album}>{album}</option>
            ))}
          </select>

          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white text-blue-600 shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FiGrid className="text-lg" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FiList className="text-lg" />
              </button>
            </div>
            <button 
              onClick={selectAll}
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold whitespace-nowrap"
            >
              {selectedItems.size === currentItems.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedItems.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-4 shadow-lg"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FiCheck className="text-xl" />
                <span className="font-semibold">
                  {selectedItems.size} item{selectedItems.size > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-500/80 backdrop-blur-sm rounded-xl font-semibold flex items-center gap-2 hover:bg-red-600 transition-colors"
                >
                  <FiTrash2 className="text-sm" />
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedItems(new Set())}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl font-semibold flex items-center gap-2 hover:bg-white/30 transition-colors"
                >
                  <FiX className="text-sm" />
                  Clear Selection
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Content */}
      {currentItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200"
        >
          <div className="text-gray-400 text-6xl mb-4">📷</div>
          <h3 className="text-gray-800 text-xl font-semibold mb-2">No media found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || selectedCategory !== 'all' || selectedAlbum !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Get started by uploading your first media file'
            }
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedAlbum('all');
              setShowModal(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            <FiUpload className="inline mr-2" />
            Upload Media
          </button>
        </motion.div>
      ) : (
        <>
          {/* Gallery Grid/List */}
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' 
              : 'space-y-3'
          }`}>
            {currentItems.map((item, index) => (
              <GalleryItem
                key={item.id}
                item={item}
                viewMode={viewMode}
                isSelected={selectedItems.has(item.id)}
                hasError={imageErrors.has(item.id)}
                onSelect={() => toggleSelection(item.id)}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
                onView={() => setSelectedMedia(item)}
                onImageError={() => handleImageError(item.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-white border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <FiChevronLeft className="text-lg" />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-white border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <FiChevronRight className="text-lg" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {showModal && (
          <UploadModal
            formData={formData}
            setFormData={setFormData}
            editingItem={editingItem}
            uploadProgress={uploadProgress}
            isUploading={isUploading}
            dragActive={dragActive}
            categories={categories.filter(cat => cat.value !== 'all')}
            albums={albums.filter(album => album !== 'all')}
            onClose={() => {
              setShowModal(false);
              setEditingItem(null);
              resetForm();
            }}
            onSubmit={editingItem ? handleUpdate : handleCreate}
            onFileSelect={handleFilesSelect}
            onDrag={handleDrag}
            onDrop={handleDrop}
            removeFile={removeFile}
            fileInputRef={fileInputRef}
          />
        )}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <PreviewModal
            item={selectedMedia}
            onClose={() => setSelectedMedia(null)}
            onDownload={() => {
              // Implement download functionality
              const link = document.createElement('a');
              link.href = selectedMedia.fileUrl;
              link.download = selectedMedia.fileName;
              link.click();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Enhanced Gallery Item Component
const GalleryItem = ({ 
  item, viewMode, isSelected, hasError, onSelect, onEdit, onDelete, onView, onImageError 
}) => {
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`bg-white rounded-2xl p-4 flex items-center gap-4 border-2 transition-all ${
          isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
        }`}
      >
        <button 
          onClick={onSelect}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            isSelected 
              ? 'bg-blue-500 border-blue-500 text-white' 
              : 'bg-white border-gray-300 hover:border-blue-400'
          }`}
        >
          <FiCheck className="text-xs" />
        </button>

        <div 
          className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden cursor-pointer flex-shrink-0 relative"
          onClick={onView}
        >
          {hasError ? (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <FiImage className="text-gray-500 text-xl" />
            </div>
          ) : item.type === 'image' ? (
            <img
              src={item.thumbnailUrl || item.fileUrl}
              alt={item.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              onError={onImageError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
              <FiVideo className="text-white text-xl" />
              <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1">
                <span className="text-white text-xs">VID</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
            {item.featured && (
              <FiStar className="text-yellow-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-gray-600 text-sm mb-1 truncate">{item.description}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="capitalize">{item.category}</span>
            <span>•</span>
            <span>{item.fileSize}</span>
            <span>•</span>
            <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onView}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg"
            title="View"
          >
            <FiEye className="text-lg" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEdit}
            className="p-2 text-gray-600 hover:text-green-600 transition-colors rounded-lg"
            title="Edit"
          >
            <FiEdit className="text-lg" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDelete}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors rounded-lg"
            title="Delete"
          >
            <FiTrash2 className="text-lg" />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
        isSelected ? 'border-blue-500 ring-4 ring-blue-200' : 'border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="relative group">
        {/* Selection Checkbox */}
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
          className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center z-20 transition-all ${
            isSelected 
              ? 'bg-blue-500 border-blue-500 text-white' 
              : 'bg-white/90 border-gray-300 text-transparent hover:border-blue-400 group-hover:text-gray-400'
          }`}
        >
          <FiCheck className="text-xs" />
        </button>

        {/* Featured Badge */}
        {item.featured && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-lg z-20">
            <FiStar className="inline mr-1 text-xs" />
            Featured
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute bottom-2 left-2 z-20">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm ${
            item.type === 'image' ? 'bg-blue-500' : 'bg-red-500'
          }`}>
            {item.type === 'image' ? 'IMG' : 'VID'}
          </span>
        </div>

        {/* Media Thumbnail */}
        <div className="aspect-square bg-gray-200 relative overflow-hidden" onClick={onView}>
          {hasError ? (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <div className="text-center">
                <FiImage className="text-gray-500 text-2xl mx-auto mb-2" />
                <p className="text-gray-500 text-xs">Failed to load image</p>
              </div>
            </div>
          ) : item.type === 'image' ? (
            <img
              src={item.thumbnailUrl || item.fileUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={onImageError}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
              <FiVideo className="text-white text-4xl" />
            </div>
          )}

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onView(); }}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-colors"
                title="View"
              >
                <FiEye className="text-lg" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-colors"
                title="Edit"
              >
                <FiEdit className="text-lg" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="p-3 bg-red-500/80 backdrop-blur-sm rounded-xl text-white hover:bg-red-600 transition-colors"
                title="Delete"
              >
                <FiTrash2 className="text-lg" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate" title={item.title}>
          {item.title}
        </h3>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span className="capitalize">{item.category}</span>
          <span>{item.fileSize}</span>
        </div>
        {item.album && (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <FiFolder className="text-xs" />
            <span className="truncate" title={item.album}>{item.album}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Enhanced Upload Modal Component
const UploadModal = ({
  formData, setFormData, editingItem, uploadProgress, isUploading, dragActive,
  categories, albums, onClose, onSubmit, onFileSelect, onDrag, onDrop, removeFile, fileInputRef
}) => {
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            {editingItem ? 'Edit Media' : 'Upload Media'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            disabled={isUploading}
          >
            <FiX className="text-xl text-gray-600" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* File Upload Section */}
            {!editingItem && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Select Files</h3>
                
                {/* Drag & Drop Zone */}
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
                  onDragEnter={onDrag}
                  onDragLeave={onDrag}
                  onDragOver={onDrag}
                  onDrop={onDrop}
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                >
                  <FiUpload className="text-4xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2 font-medium">
                    {isUploading ? 'Uploading...' : 'Drag and drop files here'}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    Supports images and videos (max 50MB each)
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => onFileSelect(e.target.files)}
                    className="hidden"
                    ref={fileInputRef}
                    disabled={isUploading}
                  />
                  {!isUploading && (
                    <button
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                      className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Browse Files
                    </button>
                  )}
                </div>

                {/* Selected Files */}
                {formData.files.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-800 mb-3">
                      Selected Files ({formData.files.length})
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {formData.files.map((file, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border">
                          <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                            {file.type.startsWith('image/') ? 
                              <FiImage className="text-gray-600" /> : 
                              <FiVideo className="text-gray-600" />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-gray-800 truncate">{file.name}</p>
                            <p className="text-gray-600 text-xs">
                              {(file.size / (1024 * 1024)).toFixed(1)} MB • {file.type.split('/')[1].toUpperCase()}
                            </p>
                          </div>
                          {uploadProgress[file.name] !== undefined ? (
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress[file.name]}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500">{uploadProgress[file.name]}%</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => removeFile(file.name)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                              disabled={isUploading}
                            >
                              <FiX className="text-lg" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter media title"
                  disabled={isUploading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isUploading}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Album
                </label>
                <select
                  value={formData.album}
                  onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isUploading}
                >
                  <option value="">Select Album</option>
                  {albums.map(album => (
                    <option key={album} value={album}>{album}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter media description"
                  disabled={isUploading}
                />
              </div>
            </div>

            {/* Tags Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-blue-900 transition-colors"
                      disabled={isUploading}
                    >
                      <FiX className="text-xs" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a tag"
                  disabled={isUploading}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors disabled:opacity-50"
                  disabled={isUploading || !newTag.trim()}
                >
                  <FiPlus className="text-lg" />
                </button>
              </div>
            </div>

            {/* Featured Toggle */}
            <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                disabled={isUploading}
              />
              <div>
                <span className="text-sm font-medium text-gray-700">Featured Media</span>
                <p className="text-xs text-gray-500">Show this media prominently in the gallery</p>
              </div>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors disabled:opacity-50"
            disabled={isUploading}
          >
            Cancel
          </button>
          <motion.button
            whileHover={!isUploading ? { scale: 1.02 } : {}}
            whileTap={!isUploading ? { scale: 0.98 } : {}}
            onClick={onSubmit}
            disabled={isUploading || (!editingItem && formData.files.length === 0) || !formData.title.trim()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 transition-all disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isUploading ? (
              <>
                <FiRotateCw className="animate-spin" />
                Uploading...
              </>
            ) : editingItem ? (
              <>
                <FiCheck />
                Update Media
              </>
            ) : (
              <>
                <FiUpload />
                Upload {formData.files.length > 1 ? `${formData.files.length} Files` : 'Media'}
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Preview Modal Component
const PreviewModal = ({ item, onClose, onDownload }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      onClick={e => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 truncate pr-4">{item.title}</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0"
        >
          <FiX className="text-xl text-gray-600" />
        </button>
      </div>

      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Media Display */}
          <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-2xl p-4 min-h-[400px]">
            {item.type === 'image' ? (
              <img
                src={item.fileUrl}
                alt={item.title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl"
              />
            ) : (
              <video
                controls
                className="max-w-full rounded-xl"
                src={item.fileUrl}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Media Details */}
          <div className="lg:w-80 space-y-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FiInfo className="text-blue-500" />
                Media Information
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium capitalize">{item.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium">{item.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{item.category}</span>
                </div>
                {item.album && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Album:</span>
                    <span className="font-medium">{item.album}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Uploaded:</span>
                  <span className="font-medium">{new Date(item.uploadDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views:</span>
                  <span className="font-medium">{item.views}</span>
                </div>
                {item.dimensions && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimensions:</span>
                    <span className="font-medium">{item.dimensions}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {item.description && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={onDownload}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <FiDownload className="text-lg" />
                Download
              </button>
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                <FiStar className="text-lg" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);