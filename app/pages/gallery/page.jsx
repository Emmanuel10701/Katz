'use client';
import { motion, AnimatePresence } from 'framer-motion';
 import React from 'react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiX, 
  FiUsers, 
  FiBook, 
  FiAward,
  FiHome,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiZoomIn,
  FiDownload,
  FiShare2,
  FiHeart,
  FiCalendar,
  FiMapPin,
  FiMessageCircle,
  FiBookOpen,
  FiActivity,
  FiMusic,
  FiVideo,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiUser,
  FiTarget,
  FiHelpCircle
} from 'react-icons/fi';
import { 
  IoPeopleOutline,
  IoLibraryOutline,
  IoFootballOutline,
  IoMusicalNotesOutline,
  IoSchoolOutline,
  IoBusinessOutline,
  IoClose,
  IoBookOutline,
  IoLanguageOutline,
  IoCalculatorOutline
} from 'react-icons/io5';
import { 
  GiGraduateCap, 
  GiTeacher,
  GiChemistry,
  GiMathBook,
  GiPalette,
  GiSportMedal,
  GiBrain,
  GiHeartPlus
} from 'react-icons/gi';
import Image from 'next/image';
import Link from 'next/link';

// Local images - mapping of available .avif files
const availableImages = ['1', '2', '4', 'h', 'r', 't', 'yh'];

// Get local image path with fallback
const getLocalImage = (identifier) => {
  // If the identifier exists in our available images, use .avif extension
  if (availableImages.includes(identifier.toString())) {
    return `/images/${identifier}.avif`;
  }
  // Fallback to a default image or first available image
  return `/images/1.avif`;
};

// Video files
const videoFiles = {
  principalIntro: "/videos/ff.mp4",
  campusTour: "/videos/hh.mp4",
  scienceDemo: "/videos/rd.mp4",
  sportsIntro: "/videos/w.mp4",
  guidanceIntro: "/videos/4.mp4"
};

export default function ModernGallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  // Department information with missions
  const departmentInfo = {
    science: {
      head: "Dr. Michael Chen",
      description: "Leading STEM education with advanced research facilities",
      mission: "To foster scientific curiosity and innovation through hands-on experimentation and research",
      teachers: 18,
      established: 2005
    },
    mathematics: {
      head: "Prof. Sarah Williams",
      description: "Building strong analytical and problem-solving skills",
      mission: "To develop logical thinking and mathematical reasoning for real-world applications",
      teachers: 15,
      established: 2003
    },
    languages: {
      head: "Ms. Emily Rodriguez",
      description: "Developing communication skills and cultural appreciation",
      mission: "To promote multilingualism and cross-cultural understanding",
      teachers: 12,
      established: 2002
    },
    humanities: {
      head: "Dr. James Peterson",
      description: "Exploring human culture, history, and society",
      mission: "To cultivate critical thinking and understanding of human experiences",
      teachers: 10,
      established: 2004
    },
    arts: {
      head: "Mr. David Park",
      description: "Nurturing creativity and artistic expression",
      mission: "To inspire creative expression and appreciation for the arts",
      teachers: 8,
      established: 2008
    },
    sports: {
      head: "Coach Maria Gonzalez",
      description: "Promoting physical fitness and sportsmanship",
      mission: "To develop athletic excellence, teamwork, and healthy lifestyles",
      teachers: 6,
      established: 2006
    },
    guidance: {
      head: "Mrs. Lisa Thompson",
      description: "Supporting student well-being and career development",
      mission: "To provide comprehensive counseling for academic and personal success",
      teachers: 4,
      established: 2010
    },
    administration: {
      head: "Dr. Sarah Johnson",
      description: "School leadership and management",
      mission: "To create an environment conducive to learning and growth",
      teachers: 5,
      established: 2000
    }
  };

  // Enhanced gallery data with all departments
  const galleryData = [
    // Leadership & Administration
    {
      id: 1,
      category: 'leadership',
      department: 'administration',
      title: 'Principal Dr. Sarah Johnson',
      description: 'School Principal with 15+ years of educational leadership experience.',
      image: '/images/1.avif',  // Direct reference to existing file
      video: videoFiles.principalIntro,
      tags: ['principal', 'leadership', 'administration', 'video'],
      date: '2024-01-15',
      featured: true,
      hasVideo: true,
      remarks: "Leading our school with passion and dedication, ensuring every student receives the best possible education."
    },
    {
      id: 2,
      category: 'leadership',
      department: 'administration',
      title: 'Deputy Principal Mr. David Wilson',
      description: 'Deputy Principal overseeing academic affairs and student development.',
      image: '/images/2.avif',  // Direct reference to existing file
      tags: ['deputy', 'leadership', 'academics'],
      date: '2024-01-10',
      featured: false
    },

    // Science Department
    {
      id: 3,
      category: 'teachers',
      department: 'science',
      title: 'Science Department Team',
      description: 'Our dedicated science faculty members conducting advanced research.',
      image: '/images/h.avif',  // Using h.avif for science team
      video: videoFiles.scienceDemo,
      tags: ['science', 'teachers', 'research', 'stem', 'video'],
      date: '2024-02-20',
      featured: true,
      hasVideo: true
    },
    {
      id: 4,
      category: 'campus',
      department: 'science',
      title: 'Physics Laboratory',
      description: 'Advanced physics lab with cutting-edge equipment for experiments.',
      image: '/images/4.avif',  // Direct reference to existing file
      tags: ['physics', 'laboratory', 'science', 'experiments'],
      date: '2024-02-18',
      featured: false
    },

    // Mathematics Department
    {
      id: 5,
      category: 'teachers',
      department: 'mathematics',
      title: 'Mathematics Faculty',
      description: 'Expert mathematics educators fostering analytical thinking.',
      image: getLocalImage(5),
      tags: ['mathematics', 'teachers', 'analytics', 'problem-solving'],
      date: '2024-02-10',
      featured: true
    },

    // Languages Department
    {
      id: 6,
      category: 'teachers',
      department: 'languages',
      title: 'Languages Department',
      description: 'Language specialists teaching English, French, and Spanish.',
      image: getLocalImage(6),
      tags: ['languages', 'teachers', 'communication', 'culture'],
      date: '2024-02-08',
      featured: true
    },

    // Humanities Department
    {
      id: 7,
      category: 'teachers',
      department: 'humanities',
      title: 'Humanities Faculty',
      description: 'Experts in history, geography, and social sciences.',
      image: getLocalImage(7),
      tags: ['humanities', 'teachers', 'history', 'geography'],
      date: '2024-02-05',
      featured: false
    },

    // Arts Department
    {
      id: 8,
      category: 'teachers',
      department: 'arts',
      title: 'Arts & Music Department',
      description: 'Creative arts and music faculty nurturing artistic talents.',
      image: getLocalImage(8),
      tags: ['arts', 'music', 'teachers', 'creative', 'expression'],
      date: '2024-02-03',
      featured: true
    },

    // Sports Department
    {
      id: 9,
      category: 'teachers',
      department: 'sports',
      title: 'Sports Department Coaches',
      description: 'Professional coaches and physical education instructors.',
      image: getLocalImage(9),
      video: videoFiles.sportsIntro,
      tags: ['sports', 'coaches', 'fitness', 'training', 'video'],
      date: '2024-01-28',
      featured: true,
      hasVideo: true
    },
    {
      id: 10,
      category: 'campus',
      department: 'sports',
      title: 'Basketball Court',
      description: 'Professional basketball court for training and competitions.',
      image: getLocalImage(10),
      tags: ['sports', 'basketball', 'court', 'athletics'],
      date: '2024-01-25',
      featured: false
    },
    {
      id: 11,
      category: 'events',
      department: 'sports',
      title: 'Annual Sports Day',
      description: 'Students participating in various athletic competitions.',
      image: getLocalImage(11),
      tags: ['sports', 'events', 'competition', 'athletics'],
      date: '2024-03-15',
      featured: true
    },
    {
      id: 12,
      category: 'campus',
      department: 'sports',
      title: 'Swimming Pool',
      description: 'Olympic-size swimming pool for training and recreation.',
      image: getLocalImage(12),
      tags: ['sports', 'swimming', 'pool', 'aquatics'],
      date: '2024-01-22',
      featured: false
    },

    // Guidance & Counseling
    {
      id: 13,
      category: 'teachers',
      department: 'guidance',
      title: 'Guidance & Counseling Team',
      description: 'Professional counselors supporting student well-being.',
      image: getLocalImage(13),
      video: videoFiles.guidanceIntro,
      tags: ['guidance', 'counseling', 'wellness', 'support', 'video'],
      date: '2024-01-20',
      featured: true,
      hasVideo: true,
      remarks: "Our guidance department is committed to supporting every student's journey to success."
    },
    {
      id: 14,
      category: 'campus',
      department: 'guidance',
      title: 'Counseling Center',
      description: 'Safe space for student counseling and career guidance.',
      image: getLocalImage(14),
      tags: ['guidance', 'counseling', 'support', 'wellness'],
      date: '2024-01-18',
      featured: false
    },

    // Student Council & Deans
    {
      id: 15,
      category: 'council',
      department: 'administration',
      title: 'Student Council 2024',
      description: 'Elected student representatives leading school initiatives.',
      image: getLocalImage(15),
      tags: ['council', 'students', 'leadership', 'representation'],
      date: '2024-01-15',
      featured: true
    },
    {
      id: 16,
      category: 'leadership',
      department: 'administration',
      title: 'Dean of Students',
      description: 'Overseeing student affairs and campus life.',
      image: getLocalImage(16),
      tags: ['dean', 'leadership', 'students', 'administration'],
      date: '2024-01-12',
      featured: false
    },

    // Campus & Infrastructure
    {
      id: 17,
      category: 'campus',
      department: 'administration',
      title: 'Main Campus Overview',
      description: 'Beautiful school campus with modern architecture.',
      image: getLocalImage(17),
      video: videoFiles.campusTour,
      tags: ['campus', 'infrastructure', 'building', 'video'],
      date: '2024-01-10',
      featured: true,
      hasVideo: true
    },
    {
      id: 18,
      category: 'campus',
      department: 'administration',
      title: 'Modern Library',
      description: 'State-of-the-art learning resource center.',
      image: getLocalImage(18),
      tags: ['library', 'campus', 'learning', 'resources'],
      date: '2024-01-08',
      featured: false
    },

    // Events
    {
      id: 19,
      category: 'events',
      department: 'administration',
      title: 'Annual Graduation',
      description: 'Celebrating student achievements and accomplishments.',
      image: getLocalImage(19),
      tags: ['graduation', 'events', 'celebration', 'achievements'],
      date: '2024-03-20',
      featured: true
    },
    {
      id: 20,
      category: 'events',
      department: 'arts',
      title: 'Cultural Festival',
      description: 'Celebrating diversity and artistic talent.',
      image: getLocalImage(20),
      tags: ['cultural', 'events', 'festival', 'arts'],
      date: '2024-03-10',
      featured: false
    },

    // Additional Sports Images
    {
      id: 21,
      category: 'events',
      department: 'sports',
      title: 'Football Tournament',
      description: 'Inter-school football championship finals.',
      image: getLocalImage(21),
      tags: ['sports', 'football', 'tournament', 'competition'],
      date: '2024-02-28',
      featured: true
    },
    {
      id: 22,
      category: 'campus',
      department: 'sports',
      title: 'Athletics Track',
      description: 'Professional running track for training and events.',
      image: getLocalImage(22),
      tags: ['sports', 'athletics', 'track', 'running'],
      date: '2024-02-25',
      featured: false
    },
    {
      id: 23,
      category: 'events',
      department: 'sports',
      title: 'Swimming Competition',
      description: 'Annual inter-house swimming championship.',
      image: getLocalImage(23),
      tags: ['sports', 'swimming', 'competition', 'aquatics'],
      date: '2024-02-20',
      featured: false
    },

    // Exams & Academics
    {
      id: 24,
      category: 'events',
      department: 'administration',
      title: 'Exam Preparation',
      description: 'Students engaged in focused study sessions.',
      image: getLocalImage(24),
      tags: ['exams', 'academics', 'study', 'preparation'],
      date: '2024-02-15',
      featured: true
    },
    {
      id: 25,
      category: 'students',
      department: 'administration',
      title: 'Award Ceremony',
      description: 'Recognizing academic excellence and achievements.',
      image: getLocalImage(25),
      tags: ['awards', 'academics', 'achievement', 'recognition'],
      date: '2024-02-10',
      featured: false
    }
  ];

  // Enhanced categories
  const categories = [
    { id: 'all', name: 'All Gallery', icon: FiHome, count: galleryData.length },
    { id: 'leadership', name: 'Leadership', icon: FiAward, count: galleryData.filter(item => item.category === 'leadership').length },
    { id: 'teachers', name: 'Teachers', icon: GiTeacher, count: galleryData.filter(item => item.category === 'teachers').length },
    { id: 'students', name: 'Students', icon: FiUsers, count: galleryData.filter(item => item.category === 'students').length },
    { id: 'council', name: 'Student Council', icon: FiStar, count: galleryData.filter(item => item.category === 'council').length },
    { id: 'campus', name: 'Campus', icon: IoSchoolOutline, count: galleryData.filter(item => item.category === 'campus').length },
    { id: 'events', name: 'Events', icon: FiCalendar, count: galleryData.filter(item => item.category === 'events').length }
  ];

  // Enhanced departments with proper icons
  const departments = [
    { id: 'science', name: 'Science', icon: GiChemistry },
    { id: 'mathematics', name: 'Mathematics', icon: IoCalculatorOutline },
    { id: 'languages', name: 'Languages', icon: IoLanguageOutline },
    { id: 'humanities', name: 'Humanities', icon: IoBookOutline },
    { id: 'arts', name: 'Arts & Music', icon: GiPalette },
    { id: 'sports', name: 'Sports', icon: GiSportMedal },
    { id: 'guidance', name: 'Guidance', icon: GiHeartPlus },
    { id: 'administration', name: 'Administration', icon: IoBusinessOutline }
  ];

  // All unique tags
  const allTags = [...new Set(galleryData.flatMap(item => item.tags))];

  // Filter function
  const filteredImages = useMemo(() => {
    let filtered = galleryData.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDepartments = selectedDepartments.length === 0 || selectedDepartments.includes(item.department);
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => item.tags.includes(tag));
      
      return matchesCategory && matchesSearch && matchesDepartments && matchesTags;
    });

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [activeCategory, searchTerm, selectedDepartments, selectedTags, sortBy]);

  // Filter functions
  const toggleDepartment = (departmentId) => {
    setSelectedDepartments(prev => 
      prev.includes(departmentId) 
        ? prev.filter(id => id !== departmentId)
        : [...prev, departmentId]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSelectedDepartments([]);
    setSelectedTags([]);
    setSearchTerm('');
    setSortBy('newest');
  };

  // Media functions
  const openLightbox = (media, index) => {
    setSelectedMedia(media);
    setLightboxIndex(index);
    setIsPlaying(false);
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const nextMedia = () => {
    const nextIndex = (lightboxIndex + 1) % filteredImages.length;
    setSelectedMedia(filteredImages[nextIndex]);
    setLightboxIndex(nextIndex);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const prevMedia = () => {
    const prevIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedMedia(filteredImages[prevIndex]);
    setLightboxIndex(prevIndex);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedMedia) return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          nextMedia();
          break;
        case 'ArrowLeft':
          prevMedia();
          break;
        case ' ':
          if (selectedMedia.hasVideo) {
            e.preventDefault();
            togglePlayPause();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia, lightboxIndex, isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm text-white/60">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <FiHome className="text-lg" />
            Home
          </Link>
          <span className="text-white/40">/</span>
          <span className="text-white">Gallery</span>
        </nav>
      </div>

      {/* Header */}
      <section className="relative py-16">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={getLocalImage(17)}
            alt="School Gallery"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 to-purple-900/80"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              School <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Gallery</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              Discover our comprehensive educational environment through vibrant visual stories
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter System */}
      <section className="py-6 bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl" />
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Controls */}
            <div className="flex gap-3 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-2xl border border-white/20 transition-colors"
              >
                <FiFilter className="text-lg" />
                Filters
                {(selectedDepartments.length > 0 || selectedTags.length > 0) && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {selectedDepartments.length + selectedTags.length}
                  </span>
                )}
              </motion.button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="featured">Featured First</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">Filters</h3>
                  <button
                    onClick={clearAllFilters}
                    className="text-white/60 hover:text-white text-sm flex items-center gap-2"
                  >
                    <FiX className="text-lg" />
                    Clear All
                  </button>
                </div>

                {/* Departments Filter */}
                <div className="mb-6">
                  <h4 className="text-white font-medium mb-3">Departments</h4>
                  <div className="flex flex-wrap gap-2">
                    {departments.map(dept => {
                      const Icon = dept.icon;
                      return (
                        <motion.button
                          key={dept.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleDepartment(dept.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all ${
                            selectedDepartments.includes(dept.id)
                              ? 'bg-blue-500 border-blue-500 text-white'
                              : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                          }`}
                        >
                          <Icon className="text-lg" />
                          <span className="text-sm">{dept.name}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Tags Filter */}
                <div>
                  <h4 className="text-white font-medium mb-3">Popular Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 15).map(tag => (
                      <motion.button
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        #{tag}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-4 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto gap-2 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl min-w-max transition-all whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{category.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Department Highlights */}
      {activeCategory === 'teachers' && (
        <section className="py-8">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Departments</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(departmentInfo).map(([deptId, info]) => (
                  <motion.div
                    key={deptId}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        {React.createElement(departments.find(d => d.id === deptId)?.icon || FiBook, { className: "text-white text-xl" })}
                      </div>
                      <h3 className="text-white font-semibold capitalize">{deptId}</h3>
                    </div>
                    <p className="text-white/70 text-sm mb-2">{info.description}</p>
                    <p className="text-white/60 text-xs italic">"{info.mission}"</p>
                    <div className="flex justify-between text-white/50 text-xs mt-3">
                      <span>{info.teachers} Teachers</span>
                      <span>Est. {info.established}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredImages.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer"
                  onClick={() => openLightbox(item, index)}
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 group-hover:border-white/40 h-full">
                    {/* Media Container */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      
                      {/* Video Badge */}
                      {item.hasVideo && (
                        <div className="absolute top-3 left-3 bg-red-500/90 text-white p-2 rounded-full">
                          <FiVideo className="text-sm" />
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          {categories.find(cat => cat.id === item.category)?.name}
                        </span>
                      </div>

                      {/* Department Badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-blue-500/80 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                          {departments.find(dept => dept.id === item.department)?.name}
                        </span>
                      </div>

                      {/* Play Button for Videos */}
                      {item.hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black/60 p-4 rounded-full backdrop-blur-md">
                            <FiPlay className="text-white text-xl" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-2 line-clamp-1 text-sm">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-xs line-clamp-2 mb-2">
                        {item.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="bg-white/10 text-white/60 px-2 py-1 rounded-full text-xs">
                            +{item.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-white/40 text-6xl mb-4">📷</div>
              <h3 className="text-white text-xl mb-2">No media found</h3>
              <p className="text-white/60 mb-4">
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white/80 hover:text-white z-10 bg-black/50 p-3 rounded-full backdrop-blur-md"
              >
                <IoClose className="text-2xl" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevMedia();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white z-10 bg-black/50 p-4 rounded-full backdrop-blur-md"
              >
                <FiChevronLeft className="text-2xl" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextMedia();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white z-10 bg-black/50 p-4 rounded-full backdrop-blur-md"
              >
                <FiChevronRight className="text-2xl" />
              </button>

              {/* Media Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full h-full flex flex-col lg:flex-row gap-6 items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Media Display */}
                <div className="flex-1 relative rounded-2xl overflow-hidden bg-black max-w-4xl max-h-[80vh]">
                  {selectedMedia.hasVideo ? (
                    <div className="relative w-full h-full">
                      <video
                        ref={videoRef}
                        src={selectedMedia.video}
                        className="w-full h-full object-contain"
                        controls={false}
                        muted={isMuted}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => setIsPlaying(false)}
                      />
                      {/* Custom Video Controls */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/50 p-3 rounded-2xl backdrop-blur-md">
                        <button
                          onClick={togglePlayPause}
                          className="text-white hover:text-blue-400 transition-colors"
                        >
                          {isPlaying ? <FiPause className="text-xl" /> : <FiPlay className="text-xl" />}
                        </button>
                        <button
                          onClick={toggleMute}
                          className="text-white hover:text-blue-400 transition-colors"
                        >
                          {isMuted ? <FiVolumeX className="text-xl" /> : <FiVolume2 className="text-xl" />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={selectedMedia.image}
                      alt={selectedMedia.title}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>

                {/* Info Panel */}
                <div className="lg:w-96 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-white max-h-[80vh] overflow-y-auto">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold pr-4">{selectedMedia.title}</h2>
                    <button
                      onClick={() => toggleFavorite(selectedMedia.id)}
                      className={`p-2 rounded-full flex-shrink-0 ${
                        favorites.has(selectedMedia.id) 
                          ? 'text-red-500' 
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <FiHeart className={`text-xl ${favorites.has(selectedMedia.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <p className="text-white/70 mb-4 text-sm">{selectedMedia.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-white/60 text-xs">Category</span>
                        <p className="font-semibold text-sm">
                          {categories.find(cat => cat.id === selectedMedia.category)?.name}
                        </p>
                      </div>
                      <div>
                        <span className="text-white/60 text-xs">Department</span>
                        <p className="font-semibold text-sm">
                          {departments.find(dept => dept.id === selectedMedia.department)?.name}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-white/60 text-xs">Date</span>
                      <p className="font-semibold text-sm">
                        {new Date(selectedMedia.date).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Department Mission */}
                    {departmentInfo[selectedMedia.department] && (
                      <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <h4 className="text-white font-semibold text-sm mb-1">
                          {selectedMedia.department.charAt(0).toUpperCase() + selectedMedia.department.slice(1)} Mission
                        </h4>
                        <p className="text-white/70 text-xs italic">
                          "{departmentInfo[selectedMedia.department].mission}"
                        </p>
                      </div>
                    )}

                    {/* Principal's Remarks */}
                    {selectedMedia.remarks && (
                      <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/20">
                        <div className="flex items-center gap-2 text-blue-300 text-xs mb-1">
                          <FiMessageCircle />
                          <span>Principal's Note</span>
                        </div>
                        <p className="text-white/80 text-xs italic">"{selectedMedia.remarks}"</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Tags */}
                  <div className="mb-4">
                    <span className="text-white/60 text-xs block mb-2">Tags</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedMedia.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-white/20 px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-white/20">
                    <button className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                      <FiDownload className="text-lg" />
                      Download
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                      <FiShare2 className="text-lg" />
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Media Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md text-sm">
                {lightboxIndex + 1} / {filteredImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}