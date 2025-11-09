'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCalendar, 
  FiClock, 
  FiMapPin, 
  FiUsers, 
  FiArrowRight,
  FiShare2,
  FiBookmark,
  FiFilter,
  FiSearch,
  FiHeart,
  FiX,
  FiLink
} from 'react-icons/fi';
import { 
  IoNewspaperOutline,
  IoCalendarClearOutline,
  IoTimeOutline,
  IoLocationOutline
} from 'react-icons/io5';
import { 
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaTelegram,
  FaReddit,
  FaEnvelope,
  FaGoogle,
  FaMicrosoft,
  FaApple
} from 'react-icons/fa';
import Image from 'next/image';

export default function EventsNewsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showNewsShareModal, setShowNewsShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const eventsData = [
    {
      id: 1,
      title: 'Annual Science & Technology Fair 2024',
      date: 'March 25, 2024',
      time: '9:00 AM - 4:00 PM',
      location: 'School Science Building',
      category: 'academic',
      type: 'Exhibition',
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: 'Showcasing innovative student projects in STEM fields including robotics, renewable energy, and biotechnology.',
      featured: true,
      registration: true,
      attendees: 250,
      speaker: 'Dr. Jane Mwangi - Tech Innovator'
    },
    {
      id: 2,
      title: 'Cultural Day Festival',
      date: 'April 12, 2024',
      time: '10:00 AM - 6:00 PM',
      location: 'School Main Grounds',
      category: 'cultural',
      type: 'Festival',
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      description: 'Celebrating diverse cultures with traditional performances, food, and art exhibitions from different communities.',
      featured: true,
      registration: false,
      attendees: 500,
      speaker: 'Cultural Ambassador Team'
    },
    {
      id: 3,
      title: 'Inter-School Sports Championship',
      date: 'May 5-7, 2024',
      time: '8:00 AM - 5:00 PM',
      location: 'School Sports Complex',
      category: 'sports',
      type: 'Competition',
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: 'Annual inter-school sports competition featuring athletics, football, basketball, and volleyball tournaments.',
      featured: false,
      registration: true,
      attendees: 300,
      speaker: 'Sports Department'
    },
    {
      id: 4,
      title: 'Career Guidance Seminar',
      date: 'June 15, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'School Auditorium',
      category: 'academic',
      type: 'Seminar',
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      description: 'Professional career guidance and university preparation workshop for Form 3 and Form 4 students.',
      featured: false,
      registration: true,
      attendees: 150,
      speaker: 'Career Counseling Department'
    }
  ];

  const newsData = [
    {
      id: 1,
      title: 'Katwanyaa High School Ranked Top in National Exams',
      date: 'March 1, 2024',
      category: 'achievement',
      excerpt: 'Our school achieves outstanding results in the 2023 KCSE examinations, ranking among the top schools in Machakos County. The school recorded a mean score of 9.8, with 95% of students qualifying for university admission.',
      fullContent: `Katwanyaa High School has once again demonstrated academic excellence by ranking among the top schools in Machakos County in the 2023 KCSE examinations. The school achieved a remarkable mean score of 9.8, with 95% of our students qualifying for university admission.

Key Highlights:
• 45 students scored A plain
• 78 students scored A minus
• 120 students scored B plus and above
• 95% university qualification rate

The Principal, Mr. John Mwangi, attributed this success to the dedication of both teachers and students, coupled with the school's robust academic program and modern learning facilities.`,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      author: 'Principal Office',
      likes: 89
    },
    {
      id: 2,
      title: 'New Computer Lab Installation Completed',
      date: 'February 20, 2024',
      category: 'development',
      excerpt: 'State-of-the-art computer laboratory equipped with 50 new computers and high-speed internet launched.',
      fullContent: `We are excited to announce the completion of our new state-of-the-art computer laboratory, marking a significant milestone in our commitment to providing modern educational facilities.

The new lab features:
• 50 brand new high-performance computers
• Fiber optic internet connection
• Interactive smart boards
• Programming and coding software
• Digital design tools

This facility will enhance our ICT curriculum and provide students with hands-on experience in technology, preparing them for the digital world.`,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      author: 'ICT Department',
      likes: 67
    },
    {
      id: 3,
      title: 'Basketball Team Wins Regional Championship',
      date: 'February 15, 2024',
      category: 'sports',
      excerpt: 'School basketball team emerges victorious in the Eastern Region Secondary Schools Championship.',
      fullContent: `Our school basketball team has brought glory to Katwanyaa High School by winning the Eastern Region Secondary Schools Championship. The team displayed exceptional skill and teamwork throughout the tournament.

Championship Journey:
• Quarter-finals: Katwanyaa 68 - 45 Mangu High
• Semi-finals: Katwanyaa 72 - 65 Starehe Boys
• Finals: Katwanyaa 75 - 70 Lenana School

The team will now represent the Eastern Region in the National Championships next month. Congratulations to our talented athletes and their dedicated coaches!`,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80",
      author: 'Sports Department',
      likes: 134
    }
  ];

  const categories = [
    { id: 'all', name: 'All Events', count: eventsData.length },
    { id: 'academic', name: 'Academic', count: eventsData.filter(e => e.category === 'academic').length },
    { id: 'cultural', name: 'Cultural', count: eventsData.filter(e => e.category === 'cultural').length },
    { id: 'sports', name: 'Sports', count: eventsData.filter(e => e.category === 'sports').length }
  ];

  // Social Platforms with colored icons and white backgrounds
  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#1877F2',
      shareUrl: (url, title, text) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#1DA1F2',
      shareUrl: (url, title, text) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#0A66C2',
      shareUrl: (url, title, text) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#25D366',
      shareUrl: (url, title, text) => `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#EA4335',
      shareUrl: (url, title, text) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    }
  ];

  // Calendar Platforms with colored icons and white backgrounds
  const calendarPlatforms = [
    {
      name: 'Google',
      icon: FaGoogle,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#EA4335',
      url: (event) => {
        const startDate = new Date(event.date + ' ' + event.time.split(' - ')[0]);
        const endDate = new Date(event.date + ' ' + event.time.split(' - ')[1]);
        
        const details = [
          'action=TEMPLATE',
          `text=${encodeURIComponent(event.title)}`,
          `dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
          `details=${encodeURIComponent(event.description)}`,
          `location=${encodeURIComponent(event.location)}`,
          'sf=true',
          'output=xml'
        ].join('&');
        
        return `https://calendar.google.com/calendar/render?${details}`;
      }
    },
    {
      name: 'Outlook',
      icon: FaMicrosoft,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#0078D4',
      url: (event) => {
        const startDate = new Date(event.date + ' ' + event.time.split(' - ')[0]);
        const endDate = new Date(event.date + ' ' + event.time.split(' - ')[1]);
        
        const details = [
          `path=/calendar/action/compose`,
          `rru=addevent`,
          `subject=${encodeURIComponent(event.title)}`,
          `startdt=${startDate.toISOString()}`,
          `enddt=${endDate.toISOString()}`,
          `body=${encodeURIComponent(event.description + '\n\nLocation: ' + event.location)}`,
          `location=${encodeURIComponent(event.location)}`
        ].join('&');
        
        return `https://outlook.live.com/calendar/0/deeplink/compose?${details}`;
      }
    },
    {
      name: 'Apple',
      icon: FaApple,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#000000',
      url: (event) => {
        const startDate = new Date(event.date + ' ' + event.time.split(' - ')[0]);
        const endDate = new Date(event.date + ' ' + event.time.split(' - ')[1]);
        
        const icsContent = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'BEGIN:VEVENT',
          `SUMMARY:${event.title}`,
          `DESCRIPTION:${event.description}`,
          `LOCATION:${event.location}`,
          `DTSTART:${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
          `DTEND:${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\n');
        
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        return URL.createObjectURL(blob);
      },
      download: true
    }
  ];

  const filteredEvents = activeTab === 'all' 
    ? eventsData 
    : eventsData.filter(event => event.category === activeTab);

  // Function to handle calendar integration
  const handleAddToCalendar = (event) => {
    setSelectedEvent(event);
    setShowCalendarModal(true);
  };

  // Function to handle calendar platform selection
  const handleCalendarPlatform = (platform, event) => {
    if (platform.download) {
      const url = platform.url(event);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${event.title.replace(/\s+/g, '_')}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const url = platform.url(event);
      window.open(url, '_blank', 'width=600,height=600');
    }
    setShowCalendarModal(false);
  };

  // Function to handle sharing
  const handleShare = (platform, item, type = 'event') => {
    const shareUrl = window.location.href;
    let title, text;
    
    if (type === 'event') {
      title = item.title;
      text = `${item.description}\n\nDate: ${item.date}\nTime: ${item.time}\nLocation: ${item.location}`;
    } else {
      title = item.title;
      text = `${item.excerpt}\n\nPublished: ${item.date}\nAuthor: ${item.author}`;
    }
    
    const platformUrl = platform.shareUrl(shareUrl, title, text);
    if (platform.name === 'Email') {
      window.location.href = platformUrl;
    } else {
      window.open(platformUrl, '_blank', 'width=600,height=400');
    }
  };

  // Function to copy link to clipboard
  const copyToClipboard = (item, type = 'event') => {
    let text;
    
    if (type === 'event') {
      text = `${item.title}\n${item.description}\n\nDate: ${item.date}\nTime: ${item.time}\nLocation: ${item.location}\n\n${window.location.href}`;
    } else {
      text = `${item.title}\n${item.excerpt}\n\nPublished: ${item.date}\nAuthor: ${item.author}\n\n${window.location.href}`;
    }
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Function to open share modal
  const openShareModal = (item, type = 'event') => {
    if (type === 'event') {
      setSelectedEvent(item);
      setShowShareModal(true);
    } else {
      setSelectedNews(item);
      setShowNewsShareModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold mb-6"
          >
            Events & News
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Stay updated with the latest happenings, achievements, and upcoming events at Katwanyaa High School
          </motion.p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Events Content */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-8"
              >
                <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search events..." 
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <FiFilter className="text-gray-600" />
                    Filter
                  </button>
                </div>
              </motion.div>

              {/* Category Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex gap-2 mb-8 overflow-x-auto"
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                      activeTab === category.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </motion.div>

              {/* Events Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {event.featured && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openShareModal(event, 'event');
                          }}
                          className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                        >
                          <FiShare2 className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          event.category === 'academic' ? 'bg-blue-100 text-blue-800' :
                          event.category === 'cultural' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.type}
                        </span>
                        <span className="text-sm text-gray-500">{event.attendees} attendees</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{event.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-3 text-gray-600">
                          <FiCalendar className="text-blue-500" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <FiClock className="text-green-500" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <FiMapPin className="text-red-500" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCalendar(event);
                          }}
                          className={`px-6 py-2 rounded-xl font-semibold text-white ${
                            event.registration 
                              ? 'bg-blue-600 hover:bg-blue-700' 
                              : 'bg-gray-400 cursor-not-allowed'
                          } transition-colors`}
                          disabled={!event.registration}
                        >
                          Add to Calendar
                        </motion.button>
                        <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                          Details <FiArrowRight className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar - News & Updates */}
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <IoNewspaperOutline className="text-blue-600" />
                  Latest News
                </h3>
                
                <div className="space-y-6">
                  {newsData.map((news, index) => (
                    <motion.div
                      key={news.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0 cursor-pointer"
                      onClick={() => setSelectedNews(news)}
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={news.image}
                            alt={news.title}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-2 ${
                            news.category === 'achievement' ? 'bg-green-100 text-green-800' :
                            news.category === 'development' ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {news.category}
                          </span>
                          <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                            {news.title}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{news.date}</span>
                            <div className="flex items-center gap-1">
                              <FiHeart className="text-gray-400" />
                              {news.likes}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white"
                >
                  <h4 className="font-bold mb-3">School Updates</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">1,200+</div>
                      <div className="text-sm text-blue-100">Students</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">98%</div>
                      <div className="text-sm text-blue-100">Success Rate</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Modal - Scrollable */}
      {selectedEvent && !showShareModal && !showCalendarModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="relative h-80 flex-shrink-0">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.title}
                fill
                className="object-cover"
              />
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <FiX className="text-gray-600 text-xl" />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedEvent.title}</h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">{selectedEvent.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 text-xl">Event Details</h4>
                    <div className="flex items-center gap-4 text-gray-600 text-lg">
                      <FiCalendar className="text-blue-500 text-xl" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 text-lg">
                      <FiClock className="text-green-500 text-xl" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 text-lg">
                      <FiMapPin className="text-red-500 text-xl" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600 text-lg">
                      <FiUsers className="text-purple-500 text-xl" />
                      <span>{selectedEvent.attendees} expected attendees</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 text-xl">Additional Info</h4>
                    <div className="text-lg">
                      <strong>Event Type:</strong> {selectedEvent.type}
                    </div>
                    <div className="text-lg">
                      <strong>Featured Speaker:</strong> {selectedEvent.speaker}
                    </div>
                    <div className="text-lg">
                      <strong>Registration:</strong> {selectedEvent.registration ? 'Required' : 'Free Entry'}
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons - Reduced Width */}
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCalendar(selectedEvent)}
                    className="flex-1 max-w-[200px] bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-lg flex items-center justify-center gap-3"
                  >
                    <FiCalendar className="text-xl" />
                    Add to Calendar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openShareModal(selectedEvent, 'event')}
                    className="flex-1 max-w-[200px] border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 text-lg"
                  >
                    <FiShare2 className="text-gray-600 text-xl" />
                    Share
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* News Modal - Scrollable with Share Only */}
      {selectedNews && !showNewsShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedNews(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Fixed Header */}
            <div className="relative h-80 flex-shrink-0">
              <Image
                src={selectedNews.image}
                alt={selectedNews.title}
                fill
                className="object-cover"
              />
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
              >
                <FiX className="text-gray-600 text-xl" />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedNews.category === 'achievement' ? 'bg-green-100 text-green-800' :
                    selectedNews.category === 'development' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {selectedNews.category}
                  </span>
                  <span className="text-gray-500 text-sm">{selectedNews.date}</span>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedNews.title}</h2>
                
                <div className="prose prose-lg max-w-none mb-8">
                  {selectedNews.fullContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Published by <span className="font-semibold text-gray-700">{selectedNews.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-500">
                      <FiHeart className="text-red-400" />
                      <span className="text-sm">{selectedNews.likes} likes</span>
                    </div>
                  </div>
                </div>
                
                {/* Share Button Only */}
                <div className="flex justify-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openShareModal(selectedNews, 'news')}
                    className="max-w-[200px] w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-lg flex items-center justify-center gap-3"
                  >
                    <FiShare2 className="text-xl" />
                    Share News
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Event Share Modal */}
      <AnimatePresence>
        {showShareModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Share Event</h3>
                  <button 
                    onClick={() => setShowShareModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiX className="text-gray-600 text-lg" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2 line-clamp-2">{selectedEvent.title}</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {socialPlatforms.map((platform, index) => {
                    const IconComponent = platform.icon;
                    return (
                      <motion.button
                        key={platform.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShare(platform, selectedEvent, 'event')}
                        className={`p-4 rounded-xl ${platform.color} transition-all duration-300 flex flex-col items-center justify-center gap-2`}
                      >
                        <IconComponent 
                          className="text-2xl" 
                          style={{ color: platform.iconColor }}
                        />
                        <span className={`text-xs font-semibold ${platform.textColor}`}>
                          {platform.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => copyToClipboard(selectedEvent, 'event')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3"
                  >
                    <FiLink className="text-lg" />
                    {copied ? 'Copied!' : 'Copy Link'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* News Share Modal */}
      <AnimatePresence>
        {showNewsShareModal && selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewsShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Share News</h3>
                  <button 
                    onClick={() => setShowNewsShareModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiX className="text-gray-600 text-lg" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2 line-clamp-2">{selectedNews.title}</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {socialPlatforms.map((platform, index) => {
                    const IconComponent = platform.icon;
                    return (
                      <motion.button
                        key={platform.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShare(platform, selectedNews, 'news')}
                        className={`p-4 rounded-xl ${platform.color} transition-all duration-300 flex flex-col items-center justify-center gap-2`}
                      >
                        <IconComponent 
                          className="text-2xl" 
                          style={{ color: platform.iconColor }}
                        />
                        <span className={`text-xs font-semibold ${platform.textColor}`}>
                          {platform.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => copyToClipboard(selectedNews, 'news')}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3"
                  >
                    <FiLink className="text-lg" />
                    {copied ? 'Copied!' : 'Copy Link'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar Modal */}
      <AnimatePresence>
        {showCalendarModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCalendarModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Add to Calendar</h3>
                  <button 
                    onClick={() => setShowCalendarModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiX className="text-gray-600 text-lg" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2 line-clamp-2">{selectedEvent.title}</p>
              </div>

              <div className="p-6">
                <div className="grid gap-4 mb-6">
                  {calendarPlatforms.map((platform, index) => {
                    const IconComponent = platform.icon;
                    return (
                      <motion.button
                        key={platform.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCalendarPlatform(platform, selectedEvent)}
                        className={`p-4 rounded-xl ${platform.color} transition-all duration-300 flex items-center gap-4 text-left`}
                      >
                        <IconComponent 
                          className="text-2xl flex-shrink-0" 
                          style={{ color: platform.iconColor }}
                        />
                        <div>
                          <span className={`font-semibold ${platform.textColor}`}>{platform.name}</span>
                          <p className="text-sm text-gray-500 mt-1">
                            {platform.download ? 'Download calendar file' : 'Open in calendar'}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}