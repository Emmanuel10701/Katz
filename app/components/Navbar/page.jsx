'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiInfo, 
  FiBook, 
  FiUserPlus,
  FiCalendar,
  FiImage,
  FiMail,
  FiLogIn,
  FiUsers,
  FiFileText,
  FiChevronDown
} from 'react-icons/fi';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../../../images/logo.jpg'; 

export default function ModernNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAcademicDropdownOpen, setIsAcademicDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Check if we need to show dropdown (at 80% zoom or below)
  const shouldShowDropdown = windowWidth > 0 && windowWidth < 1600;

  const navigation = [
    { 
      name: 'Home', 
      href: '/', 
      icon: FiHome 
    },
    { 
      name: 'About', 
      href: '/pages/AboutUs',
      icon: FiInfo
    },
    { 
      name: 'Academics', 
      href: '/pages/academics',
      icon: FiBook,
      hasDropdown: shouldShowDropdown
    },
    { 
      name: 'Admissions', 
      href: '/pages/admissions',
      icon: FiUserPlus
    },
    ...(shouldShowDropdown ? [] : [
      { 
        name: 'Assignments', 
        href: '/pages/assignments',
        icon: FiFileText 
      }
    ]),
    { 
      name: 'Staff', 
      href: '/pages/staff',
      icon: FiUsers 
    },
    { 
      name: 'Gallery', 
      href: '/pages/gallery', 
      icon: FiImage 
    },
    ...(shouldShowDropdown ? [] : [
      { 
        name: 'Events', 
        href: '/pages/eventsandnews', 
        icon: FiCalendar 
      }
    ]),
    { 
      name: 'Contact', 
      href: '/pages/contact', 
      icon: FiMail 
    }
  ];

  // Function to check if a link is active
  const isActiveLink = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname && pathname.startsWith(href);
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50' 
            : 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
        }`}
      >
        {/* Main Navigation */}
        <div className="max-w-[1800px] mx-auto px-4 lg:px-6 w-full">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Fixed on left */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 flex-shrink-0"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Image
                  src={logo}
                  alt="Katwanyaa High School Logo"
                  width={24}
                  height={24}
                  className="filter brightness-0 invert"
                />
              </div>
              <div className="opacity-100">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                  Katwanyaa High
                </h1>
                <p className="text-sm text-gray-500 hidden lg:block whitespace-nowrap">
                  Nurturing Excellence
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-center mx-4">
              {navigation.map((item) => {
                const isActive = isActiveLink(item.href);
                
                if (item.hasDropdown) {
                  return (
                    <div key={item.name} className="relative">
                      <motion.button
                        whileHover={{ y: -2 }}
                        onHoverStart={() => setIsAcademicDropdownOpen(true)}
                        onHoverEnd={() => setIsAcademicDropdownOpen(false)}
                        className={`flex items-center gap-2 font-semibold transition-colors text-[15px] whitespace-nowrap px-3 py-2 rounded-lg ${
                          isActive || isActiveLink('/pages/assignments') || isActiveLink('/pages/eventsandnews')
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="text-[16px] flex-shrink-0" />
                        <span>{item.name}</span>
                        <FiChevronDown className={`text-[14px] transition-transform duration-200 ${
                          isAcademicDropdownOpen ? 'rotate-180' : ''
                        }`} />
                      </motion.button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isAcademicDropdownOpen && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 py-2 z-50"
                            onHoverStart={() => setIsAcademicDropdownOpen(true)}
                            onHoverEnd={() => setIsAcademicDropdownOpen(false)}
                          >
                            <a
                              href={item.href}
                              className={`flex items-center gap-2 px-4 py-2 text-[14px] font-medium transition-colors ${
                                isActiveLink(item.href)
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                              }`}
                            >
                              <FiBook className="text-[14px]" />
                              Academics Overview
                            </a>
                            <a
                              href="/pages/assignments"
                              className={`flex items-center gap-2 px-4 py-2 text-[14px] font-medium transition-colors ${
                                isActiveLink('/pages/assignments')
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                              }`}
                            >
                              <FiFileText className="text-[14px]" />
                              Assignments
                            </a>
                            <a
                              href="/pages/eventsandnews"
                              className={`flex items-center gap-2 px-4 py-2 text-[14px] font-medium transition-colors ${
                                isActiveLink('/pages/eventsandnews')
                                  ? 'text-blue-600 bg-blue-50'
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                              }`}
                            >
                              <FiCalendar className="text-[14px]" />
                              Events & News
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileHover={{ y: -2 }}
                    className={`flex items-center gap-2 font-semibold transition-colors text-[15px] whitespace-nowrap px-3 py-2 rounded-lg ${
                      isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="text-[16px] flex-shrink-0" />
                    <span>{item.name}</span>
                  </motion.a>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <motion.a
                href="/pages/adminLogin"
                whileHover={{ y: -2 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold border transition-colors whitespace-nowrap text-[15px] ${
                  isActiveLink('/pages/adminLogin')
                    ? 'text-blue-600 bg-blue-50 border-blue-200'
                    : 'text-blue-600 hover:bg-blue-50 border-blue-200'
                }`}
              >
                <FiLogIn className="text-[16px] flex-shrink-0" />
                Login
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 bg-gray-100 transition-colors flex-shrink-0"
            >
              {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-6">
                {/* Mobile Navigation - Always show all items */}
                <div className="space-y-2">
                  {[
                    { name: 'Home', href: '/', icon: FiHome },
                    { name: 'About', href: '/pages/AboutUs', icon: FiInfo },
                    { name: 'Academics', href: '/pages/academics', icon: FiBook },
                    { name: 'Assignments', href: '/pages/assignments', icon: FiFileText },
                    { name: 'Admissions', href: '/pages/admissions', icon: FiUserPlus },
                    { name: 'Staff', href: '/pages/staff', icon: FiUsers },
                    { name: 'Gallery', href: '/pages/gallery', icon: FiImage },
                    { name: 'Events', href: '/pages/eventsandnews', icon: FiCalendar },
                    { name: 'Contact', href: '/pages/contact', icon: FiMail }
                  ].map((item) => {
                    const isActive = isActiveLink(item.href);
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-base whitespace-nowrap ${
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="text-xl flex-shrink-0" />
                        {item.name}
                      </a>
                    );
                  })}
                </div>

                {/* Mobile Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200/50">
                  <a
                    href="/pages/adminLogin"
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all font-semibold text-base border whitespace-nowrap ${
                      isActiveLink('/pages/adminLogin')
                        ? 'bg-blue-100 text-blue-600 border-blue-300'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FiLogIn className="text-lg flex-shrink-0" />
                    Login
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed nav */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
}