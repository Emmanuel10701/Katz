'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiSend,
  FiCheckCircle,
  FiUser,
  FiBook,
  FiCalendar,
  FiNavigation,
  FiStar,
  FiAward,
  FiShare2,
  FiMessageCircle,
  FiHeart,
  FiVideo,
  FiPlay
} from 'react-icons/fi';
import { 
  IoLogoWhatsapp,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoYoutube,
  IoLogoLinkedin,
  IoSparkles,
  IoClose
} from 'react-icons/io5';

// Dynamically import the map component to avoid SSR issues
const MapWithNoSSR = dynamic(() => import('../../components/mapcomponent/page'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-slate-800/50 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20">
      <div className="text-gray-400 animate-pulse">Loading interactive map...</div>
    </div>
  )
});

export default function ModernContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    studentGrade: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState(null);

  const contactInfo = [
    {
      icon: FiMapPin,
      title: 'Visit Our Campus',
      details: ['Kambusu, Along Kangundo Road', 'Tala, Machakos County, Kenya'],
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-slate-800/50 backdrop-blur-sm',
      link: 'https://maps.google.com/?q=-1.246601,37.345945',
      gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      details: ['+254 712 345 678', '+254 734 567 890'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-slate-800/50 backdrop-blur-sm',
      link: 'tel:+254712345678',
      gradient: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    {
      icon: FiMail,
      title: 'Email Us',
      details: ['admissions@katwanyaa.ac.ke', 'info@katwanyaa.ac.ke'],
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-slate-800/50 backdrop-blur-sm',
      link: 'mailto:admissions@katwanyaa.ac.ke',
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      icon: FiClock,
      title: 'Office Hours',
      details: ['Mon - Fri: 7:30 AM - 4:30 PM', 'Sat: 8:00 AM - 1:00 PM'],
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-slate-800/50 backdrop-blur-sm',
      link: null,
      gradient: 'bg-gradient-to-br from-orange-500 to-red-500'
    }
  ];

  const departments = [
    {
      id: 'admissions',
      name: 'Admissions Office',
      email: 'admissions@katwanyaa.ac.ke',
      phone: '+254 712 345 678',
      description: 'For enrollment and application inquiries',
      icon: FiUser,
      color: 'from-blue-500 to-cyan-500',
      head: 'Mrs. Grace Mwende',
      hours: 'Mon-Fri: 8:00 AM - 4:00 PM'
    },
    {
      id: 'academics',
      name: 'Academic Office',
      email: 'academics@katwanyaa.ac.ke',
      phone: '+254 723 456 789',
      description: 'Curriculum and academic programs',
      icon: FiBook,
      color: 'from-purple-500 to-pink-500',
      head: 'Dr. James Kamau',
      hours: 'Mon-Fri: 7:30 AM - 3:30 PM'
    },
    {
      id: 'student-affairs',
      name: 'Student Affairs',
      email: 'studentaffairs@katwanyaa.ac.ke',
      phone: '+254 734 567 890',
      description: 'Student welfare and activities',
      icon: FiAward,
      color: 'from-green-500 to-emerald-500',
      head: 'Mr. David Ochieng',
      hours: 'Mon-Fri: 8:00 AM - 4:30 PM'
    },
    {
      id: 'sports',
      name: 'Sports Department',
      email: 'sports@katwanyaa.ac.ke',
      phone: '+254 745 678 901',
      description: 'Athletics and sports programs',
      icon: FiStar,
      color: 'from-yellow-500 to-amber-500',
      head: 'Coach Maria Gonzalez',
      hours: 'Mon-Sat: 6:00 AM - 6:00 PM'
    }
  ];

  const socialMedia = [
    {
      icon: IoLogoWhatsapp,
      name: 'WhatsApp',
      link: 'https://wa.me/254712345678',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      hover: 'hover:from-green-600 hover:to-emerald-700 hover:shadow-2xl',
      description: 'Quick Support',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: IoLogoInstagram,
      name: 'Instagram',
      link: 'https://instagram.com/katwanyaahigh',
      color: 'bg-gradient-to-br from-pink-500 to-rose-600',
      hover: 'hover:from-pink-600 hover:to-rose-700 hover:shadow-2xl',
      description: 'Visual Stories',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: IoLogoFacebook,
      name: 'Facebook',
      link: 'https://facebook.com/katwanyaahigh',
      color: 'bg-gradient-to-br from-blue-600 to-indigo-700',
      hover: 'hover:from-blue-700 hover:to-indigo-800 hover:shadow-2xl',
      description: 'Community',
      gradient: 'from-blue-600 to-indigo-700'
    },
    {
      icon: IoLogoTwitter,
      name: 'Twitter',
      link: 'https://twitter.com/katwanyaahigh',
      color: 'bg-gradient-to-br from-sky-500 to-blue-600',
      hover: 'hover:from-sky-600 hover:to-blue-700 hover:shadow-2xl',
      description: 'Quick Updates',
      gradient: 'from-sky-500 to-blue-600'
    },
    {
      icon: IoLogoYoutube,
      name: 'YouTube',
      link: 'https://youtube.com/katwanyaahigh',
      color: 'bg-gradient-to-br from-red-500 to-rose-700',
      hover: 'hover:from-red-600 hover:to-rose-800 hover:shadow-2xl',
      description: 'Videos & Events',
      gradient: 'from-red-500 to-rose-700'
    },
    {
      icon: IoLogoLinkedin,
      name: 'LinkedIn',
      link: 'https://linkedin.com/school/katwanyaahigh',
      color: 'bg-gradient-to-br from-blue-700 to-indigo-800',
      hover: 'hover:from-blue-800 hover:to-indigo-900 hover:shadow-2xl',
      description: 'Professional',
      gradient: 'from-blue-700 to-indigo-800'
    }
  ];

  const quickActions = [
    {
      icon: FiUser,
      title: 'Apply for Admission',
      description: 'Start your application process',
      link: '/admissions',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiCalendar,
      title: 'View Events Calendar',
      description: 'See upcoming school events',
      link: '/events',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiBook,
      title: 'Explore Programs',
      description: 'Discover academic offerings',
      link: '/academics',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiVideo,
      title: 'Virtual Tour',
      description: 'Take a campus tour online',
      link: '/tour',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowToast(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      studentGrade: '',
      inquiryType: 'general'
    });

    // Hide toast after 5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const openDepartmentModal = (dept) => {
    setActiveDepartment(dept);
  };

  const closeDepartmentModal = () => {
    setActiveDepartment(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 border border-white/20 backdrop-blur-sm"
          >
            <IoSparkles className="text-yellow-400" />
            <span className="text-sm font-medium">We're Here to Help You</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
          >
            Connect with our dedicated team. We're here to help you with admissions, programs, 
            and everything about campus life at Katwanyaa High School.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards & Map Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link || '#'}
                  target={item.link ? '_blank' : '_self'}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`block p-6 rounded-3xl ${item.bgColor} border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 group backdrop-blur-sm`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl ${item.gradient} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <item.icon className="text-2xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                        {item.title}
                      </h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-blue-100 mb-2 text-sm leading-relaxed">{detail}</p>
                      ))}
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white shadow-2xl backdrop-blur-sm border border-white/20"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <FiNavigation className="text-xl" />
                  </div>
                  <h3 className="text-xl font-bold">Quick Actions</h3>
                </div>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <motion.a
                      key={index}
                      href={action.link}
                      whileHover={{ x: 8, scale: 1.02 }}
                      className="flex items-center gap-4 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/10 group"
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${action.color} text-white group-hover:scale-110 transition-transform`}>
                        <action.icon className="text-lg" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{action.title}</h4>
                        <p className="text-blue-100 text-sm">{action.description}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Map & Contact Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Enhanced Map Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 rounded-3xl shadow-2xl p-8 border border-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                    <FiMapPin className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Find Our Campus</h2>
                    <p className="text-blue-100 text-sm">Located in the heart of Kambusu, easily accessible from Tala town</p>
                  </div>
                </div>
                
                <div className="mb-6 bg-slate-700/30 rounded-2xl p-4 border border-white/10">
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Our campus is strategically located along Kangundo Road in Kambusu, Tala, Machakos County. 
                    Easily accessible by public transport with ample parking space available for visitors.
                  </p>
                </div>
                
                <MapWithNoSSR />
                
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-blue-100">
                    <FiMapPin className="text-blue-400 flex-shrink-0 text-lg" />
                    <span className="text-sm">Kambusu, Along Kangundo Road, Tala, Machakos County</span>
                  </div>
                  <motion.a
                    href="https://maps.google.com/?q=-1.246601,37.345945"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-2xl transition-all flex items-center gap-3 whitespace-nowrap border border-white/20 backdrop-blur-sm"
                  >
                    <FiNavigation className="text-lg" />
                    Get Directions
                  </motion.a>
                </div>
              </motion.div>

              {/* Enhanced Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 rounded-3xl shadow-2xl p-8 border border-white/10 backdrop-blur-sm"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-4 border border-white/20">
                    <FiMessageCircle className="text-blue-400" />
                    <span className="text-sm font-medium">Send us a message</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">Let's Start a Conversation</h2>
                  <p className="text-blue-100 text-lg">We'll get back to you within 24 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-blue-100 mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 bg-slate-700/50 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm hover:border-white/30"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-blue-100 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 bg-slate-700/50 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm hover:border-white/30"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-blue-100 mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-slate-700/50 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm hover:border-white/30"
                        placeholder="+254 712 345 678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-blue-100 mb-3">
                        Student Grade
                      </label>
                      <select
                        name="studentGrade"
                        value={formData.studentGrade}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-slate-700/50 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm hover:border-white/30"
                      >
                        <option value="" className="bg-slate-800">Select grade</option>
                        <option value="form1" className="bg-slate-800">Form 1</option>
                        <option value="form2" className="bg-slate-800">Form 2</option>
                        <option value="form3" className="bg-slate-800">Form 3</option>
                        <option value="form4" className="bg-slate-800">Form 4</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-blue-100 mb-3">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-slate-700/50 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm hover:border-white/30"
                    >
                      <option value="general" className="bg-slate-800">General Inquiry</option>
                      <option value="admissions" className="bg-slate-800">Admissions</option>
                      <option value="academics" className="bg-slate-800">Academics</option>
                      <option value="sports" className="bg-slate-800">Sports</option>
                      <option value="facilities" className="bg-slate-800">Facilities</option>
                      <option value="other" className="bg-slate-800">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-blue-100 mb-3">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-slate-700/50 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm hover:border-white/30"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-blue-100 mb-3">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="w-full px-4 py-4 bg-slate-700/50 border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none backdrop-blur-sm hover:border-white/30"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <div className="flex justify-center pt-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full max-w-md bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-white/20 backdrop-blur-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <FiSend className="text-xl" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments & Social Media Section */}
      <section className="py-20 bg-slate-800/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Contact Specific Departments
            </h2>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto">
              Reach out to the right team for your specific needs. Our dedicated departments are here to assist you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {departments.map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => openDepartmentModal(dept)}
                className="bg-slate-800/50 rounded-3xl p-6 border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-sm cursor-pointer group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${dept.color} text-white group-hover:scale-110 transition-transform shadow-lg`}>
                    <dept.icon className="text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text">
                    {dept.name}
                  </h3>
                </div>
                <p className="text-blue-100 mb-6 text-sm leading-relaxed">{dept.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-300 text-sm group/item">
                    <FiMail className="text-lg flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                    <span className="break-all">{dept.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-300 text-sm group/item">
                    <FiPhone className="text-lg flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                    <span>{dept.phone}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Modernized Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 border border-white/20">
              <IoSparkles className="text-yellow-400" />
              <span className="text-sm font-medium">Join Our Community</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Connect With Us
            </h3>
            <p className="text-blue-100 mb-12 text-xl max-w-2xl mx-auto">
              Stay updated with the latest news, events, and achievements from Katwanyaa High School
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`${social.color} ${social.hover} text-white p-5 rounded-2xl shadow-xl transition-all duration-300 group flex flex-col items-center min-w-[120px] backdrop-blur-sm border border-white/20`}
                >
                  <social.icon className="text-2xl mb-3 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-sm mb-1">{social.name}</span>
                  <span className="text-xs opacity-80">{social.description}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Department Detail Modal */}
      <AnimatePresence>
        {activeDepartment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeDepartmentModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800/90 backdrop-blur-md rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${activeDepartment.color} text-white`}>
                    <activeDepartment.icon className="text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{activeDepartment.name}</h3>
                </div>
                <button
                  onClick={closeDepartmentModal}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <IoClose className="text-2xl text-white/80 hover:text-white" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Department Head</h4>
                    <p className="text-blue-100">{activeDepartment.head}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Office Hours</h4>
                    <p className="text-blue-100">{activeDepartment.hours}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Description</h4>
                  <p className="text-blue-100 leading-relaxed">{activeDepartment.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <a
                    href={`mailto:${activeDepartment.email}`}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-2xl text-center font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <FiMail className="text-lg" />
                    Send Email
                  </a>
                  <a
                    href={`tel:${activeDepartment.phone}`}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl text-center font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <FiPhone className="text-lg" />
                    Call Now
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-sm border border-green-400/30">
              <FiCheckCircle className="text-xl" />
              <span className="font-semibold">Message sent successfully! We'll get back to you soon.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}