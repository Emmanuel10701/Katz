'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiShare2,
  FiX,
  FiLinkedin,
  FiAward,
  FiBook,
  FiUsers
} from 'react-icons/fi';
import { 
  IoPeopleOutline,
  IoRocketOutline,
  IoLibraryOutline,
  IoStatsChartOutline,
  IoSparkles,
  IoStar,
  IoFlame
} from 'react-icons/io5';
import { 
  FaChalkboardTeacher,
  FaUserTie,
  FaGraduationCap,
  FaHeart
} from 'react-icons/fa';
import { 
  FaFacebook,
  FaTwitter,
  FaLinkedin as FaLinkedinBrand,
  FaWhatsapp,
  FaEnvelope
} from 'react-icons/fa';
import Image from 'next/image';

export default function StaffLeadershipPage() {
  const [activeDepartment, setActiveDepartment] = useState('administration');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const departments = [
    { 
      id: 'administration', 
      name: 'Administration', 
      icon: FaUserTie, 
      color: 'from-blue-500 to-cyan-500',
      count: 3
    },
    { 
      id: 'bom', 
      name: 'Board of Management', 
      icon: IoPeopleOutline, 
      color: 'from-purple-500 to-pink-500',
      count: 2
    },
    { 
      id: 'sciences', 
      name: 'Science Department', 
      icon: IoRocketOutline, 
      color: 'from-green-500 to-emerald-500',
      count: 4
    },
    { 
      id: 'mathematics', 
      name: 'Mathematics', 
      icon: IoStatsChartOutline, 
      color: 'from-orange-500 to-red-500',
      count: 3
    },
    { 
      id: 'languages', 
      name: 'Languages', 
      icon: IoLibraryOutline, 
      color: 'from-indigo-500 to-purple-500',
      count: 4
    },
    { 
      id: 'humanities', 
      name: 'Humanities', 
      icon: FaGraduationCap, 
      color: 'from-yellow-500 to-orange-500',
      count: 3
    },
    { 
      id: 'counseling', 
      name: 'Guidance & Counseling', 
      icon: FaHeart, 
      color: 'from-pink-500 to-rose-500',
      count: 2
    },
    { 
      id: 'council', 
      name: 'Student Council', 
      icon: FaChalkboardTeacher, 
      color: 'from-teal-500 to-cyan-500',
      count: 5
    }
  ];

  const staffData = {
    administration: [
      {
        id: 1,
        name: 'Mr. John Mwangi',
        role: 'Principal',
        position: 'Chief Administrator',
        image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
        department: 'Administration',
        email: 'principal@katwanyaa.ac.ke',
        phone: '+254 722 111 113',
        bio: 'Dedicated educational leader with over 15 years of experience in school management and academic excellence.',
        responsibilities: ['Overall school management', 'Academic oversight', 'Staff supervision', 'Strategic planning'],
        expertise: ['Educational Leadership', 'Curriculum Development', 'Staff Management'],
        achievements: ['National School of the Year 2023', 'Infrastructure Modernization Project']
      },
      {
        id: 2,
        name: 'Mrs. Grace Wanjiku',
        role: 'Deputy Principal - Academics',
        position: 'Academic Head',
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        department: 'Administration',
        email: 'dprincipal.academics@katwanyaa.ac.ke',
        phone: '+254 722 111 114',
        bio: 'Passionate educator specializing in curriculum development and academic excellence.',
        responsibilities: ['Curriculum development', 'Academic performance', 'Teacher supervision', 'Student assessment'],
        expertise: ['Curriculum Design', 'Educational Assessment', 'Teacher Training'],
        achievements: ['98% University Transition Rate', 'STEM Program Excellence Award']
      }
    ],
    bom: [
      {
        id: 3,
        name: 'Mr. James Mutua',
        role: 'Chairperson - BOM',
        position: 'Board Chairman',
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        department: 'Board of Management',
        email: 'chairman@katwanyaa.ac.ke',
        phone: '+254 722 111 111',
        bio: 'Experienced leader committed to educational excellence and community development.',
        responsibilities: ['Overall school governance', 'Policy formulation', 'Strategic planning', 'Financial oversight'],
        expertise: ['Strategic Planning', 'Policy Development', 'Financial Management'],
        achievements: ['School Infrastructure Development', 'Community Partnership Initiatives']
      }
    ],
    sciences: [
      {
        id: 4,
        name: 'Dr. Sarah Chen',
        role: 'HOD Sciences',
        position: 'Head of Science Department',
        image: "https://images.unsplash.com/photo-1551836026-d5c088a2d16b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        department: 'Science Department',
        email: 'sciences@katwanyaa.ac.ke',
        bio: 'Passionate science educator with expertise in innovative teaching methodologies.',
        responsibilities: ['Department leadership', 'Science curriculum', 'Laboratory management', 'Student research projects'],
        expertise: ['Physics & Chemistry', 'Research Methodology', 'STEM Education'],
        achievements: ['National Science Fair Winners', 'Innovative Lab Equipment Setup']
      }
    ],
    counseling: [
      {
        id: 5,
        name: 'Mrs. Ann Wairimu',
        role: 'Senior Guidance Counselor',
        position: 'Head of Counseling',
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
        department: 'Guidance & Counseling',
        email: 'counseling@katwanyaa.ac.ke',
        phone: '+254 722 111 116',
        bio: 'Compassionate counselor dedicated to student wellness and career development.',
        responsibilities: ['Student counseling', 'Career guidance', 'Crisis management', 'Wellness programs'],
        expertise: ['Career Counseling', 'Student Wellness', 'Crisis Intervention'],
        achievements: ['Student Wellness Program', 'Career Development Workshops']
      }
    ],
    council: [
      {
        id: 6,
        name: 'Brian Maina',
        role: 'Student President',
        position: 'Head of Student Council',
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        department: 'Student Council',
        class: 'Form 4 East',
        bio: 'Dedicated student leader committed to representing student interests and enhancing school community.',
        responsibilities: ['Student representation', 'Council meetings', 'Event coordination', 'Student welfare'],
        expertise: ['Leadership', 'Public Speaking', 'Event Planning'],
        achievements: ['Student Feedback System', 'Community Service Projects']
      }
    ]
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: FaFacebook,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#1877F2',
      shareUrl: (staff) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`Meet ${staff.name} - ${staff.role} at Katwanyaa High School`)}`
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#1DA1F2',
      shareUrl: (staff) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Meet ${staff.name} - ${staff.role} at Katwanyaa High School`)}`
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedinBrand,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#0A66C2',
      shareUrl: (staff) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#25D366',
      shareUrl: (staff) => `https://wa.me/?text=${encodeURIComponent(`Meet ${staff.name} - ${staff.role} at Katwanyaa High School ${window.location.href}`)}`
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      color: 'bg-white hover:bg-gray-50 border border-gray-200',
      textColor: 'text-gray-800',
      iconColor: '#EA4335',
      shareUrl: (staff) => `mailto:?subject=${encodeURIComponent(`Meet ${staff.name} - Katwanyaa High School`)}&body=${encodeURIComponent(`Check out ${staff.name}, ${staff.role} at Katwanyaa High School: ${window.location.href}`)}`
    }
  ];

  const currentStaff = staffData[activeDepartment] || [];

  const handleShare = (platform, staff) => {
    const url = platform.shareUrl(staff);
    if (platform.name === 'Email') {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'width=600,height=400');
    }
    setShowShareModal(false);
  };

  const copyToClipboard = (staff) => {
    const text = `Meet ${staff.name} - ${staff.role} at Katwanyaa High School\n\n${staff.bio}\n\n${window.location.href}`;
    navigator.clipboard.writeText(text).then(() => {
      // You can add a toast notification here
      console.log('Profile link copied!');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
      {/* Enhanced Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/20">
              <IoSparkles className="text-xl" />
              <span className="font-semibold">Meet Our Exceptional Team</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Our Team
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Discover the passionate educators, visionary leaders, and dedicated professionals 
              who inspire excellence at Katwanyaa High School
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Modern Department Tabs */}
      <section className="py-8 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-20 z-40">
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
            {departments.map((department) => {
              const IconComponent = department.icon;
              return (
                <motion.button
                  key={department.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveDepartment(department.id)}
                  className={`px-6 py-4 rounded-2xl font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-3 min-w-max ${
                    activeDepartment === department.id
                      ? `bg-gradient-to-r ${department.color} text-white shadow-lg`
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200/80 shadow-sm'
                  }`}
                >
                  <IconComponent className={`text-lg ${activeDepartment === department.id ? 'text-white' : 'text-gray-400'}`} />
                  {department.name}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activeDepartment === department.id ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {department.count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentStaff.map((staff, index) => (
              <motion.div
                key={staff.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => setSelectedStaff(staff)}
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-gray-200/50 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:border-blue-200/50">
                  {/* Image with Gradient Overlay */}
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={staff.image}
                      alt={staff.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
                    
                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStaff(staff);
                          setShowShareModal(true);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-sm"
                      >
                        <FiShare2 className="text-gray-600 text-sm" />
                      </button>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-bold text-xl mb-1">{staff.name}</h3>
                      <p className="text-blue-200 font-semibold">{staff.role}</p>
                      <p className="text-gray-300 text-sm mt-1">{staff.position}</p>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {staff.department}
                      </span>
                      {staff.class && (
                        <span className="text-xs text-gray-500 font-medium">
                          {staff.class}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{staff.bio}</p>
                    
                    {/* Contact Buttons */}
                    <div className="flex gap-2">
                      {staff.email && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={`mailto:${staff.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl text-center text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <FiMail className="text-sm" />
                          Email
                        </motion.a>
                      )}
                      {staff.phone && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={`tel:${staff.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl text-center text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <FiPhone className="text-sm" />
                          Call
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {currentStaff.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiUsers className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No staff members found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                This department is currently being updated. Please check back soon.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Staff Detail Modal */}
      <AnimatePresence>
        {selectedStaff && !showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStaff(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header with Image */}
              <div className="relative h-80 flex-shrink-0">
                <Image
                  src={selectedStaff.image}
                  alt={selectedStaff.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedStaff(null)}
                  className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <FiX className="text-gray-600 text-lg" />
                </motion.button>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedStaff.name}</h2>
                  <p className="text-blue-200 font-semibold text-lg mb-1">{selectedStaff.role}</p>
                  <p className="text-gray-300">{selectedStaff.position}</p>
                </div>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                  {/* Action Buttons */}
                  <div className="flex gap-4 mb-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowShareModal(true)}
                      className="flex-1 max-w-[200px] bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                    >
                      <FiShare2 className="text-xl" />
                      Share Profile
                    </motion.button>
                    {selectedStaff.email && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`mailto:${selectedStaff.email}`}
                        className="flex-1 max-w-[200px] bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                      >
                        <FiMail className="text-xl" />
                        Send Email
                      </motion.a>
                    )}
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Bio & Contact */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          About
                        </h4>
                        <p className="text-gray-600 leading-relaxed">{selectedStaff.bio}</p>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Contact Information
                        </h4>
                        {selectedStaff.email && (
                          <div className="flex items-center gap-4 text-gray-600 p-3 bg-gray-50 rounded-xl mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <FiMail className="text-blue-600 text-lg" />
                            </div>
                            <div>
                              <a href={`mailto:${selectedStaff.email}`} className="hover:text-blue-600 font-medium block">
                                {selectedStaff.email}
                              </a>
                              <span className="text-sm text-gray-500">Email Address</span>
                            </div>
                          </div>
                        )}
                        {selectedStaff.phone && (
                          <div className="flex items-center gap-4 text-gray-600 p-3 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <FiPhone className="text-green-600 text-lg" />
                            </div>
                            <div>
                              <a href={`tel:${selectedStaff.phone}`} className="hover:text-green-600 font-medium block">
                                {selectedStaff.phone}
                              </a>
                              <span className="text-sm text-gray-500">Phone Number</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Responsibilities & Expertise */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Key Responsibilities
                        </h4>
                        <div className="space-y-2">
                          {selectedStaff.responsibilities.map((resp, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                            >
                              <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                              <span className="text-gray-700">{resp}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          Areas of Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedStaff.expertise.map((exp, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                            >
                              {exp}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  {selectedStaff.achievements && (
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        Notable Achievements
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedStaff.achievements.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100"
                          >
                            <div className="flex items-center gap-3">
                              <FiAward className="text-yellow-600 text-lg" />
                              <span className="text-yellow-800 font-medium">{achievement}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && selectedStaff && (
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
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">Share Profile</h3>
                  <button 
                    onClick={() => setShowShareModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiX className="text-gray-600 text-lg" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">Share {selectedStaff.name}'s profile</p>
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
                        onClick={() => handleShare(platform, selectedStaff)}
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
                    onClick={() => copyToClipboard(selectedStaff)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3"
                  >
                    <FiLink className="text-lg" />
                    Copy Link
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}