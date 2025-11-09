'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBook, 
  FiUsers, 
  FiAward, 
  FiBarChart2, 
  FiTarget,
  FiClock,
  FiCheckCircle,
  FiArrowRight,
  FiPlay,
  FiDownload,
  FiCalendar,
  FiStar,
  FiChevronDown,
  FiVideo,
  FiMapPin,
  FiMessageCircle
} from 'react-icons/fi';
import { 
  IoRocketOutline,
  IoLibraryOutline,
  IoCalculatorOutline,
  IoFlaskOutline,
  IoMusicalNotesOutline,
  IoBasketballOutline,
  IoSparkles
} from 'react-icons/io5';
import Image from 'next/image';

export default function ModernAcademicsPage() {
  const [activeDepartment, setActiveDepartment] = useState('stem');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [activeFeature, setActiveFeature] = useState(0);

  // Online images for academic sections
  const academicImages = {
    stem: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
    arts: "https://images.unsplash.com/photo-1547036967-23d11aacaee0",
    sports: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    library: "https://images.unsplash.com/photo-1589998059171-988d887df646",
    classroom: "https://images.unsplash.com/photo-1588072432836-e10032774350"
  };

  const academicStats = [
    { value: '98%', label: 'Graduation Rate', icon: FiAward, color: 'from-green-500 to-emerald-500' },
    { value: '85%', label: 'University Acceptance', icon: FiBook, color: 'from-blue-500 to-cyan-500' },
    { value: '25+', label: 'AP Courses Offered', icon: FiBarChart2, color: 'from-purple-500 to-pink-500' },
    { value: '1:15', label: 'Student-Teacher Ratio', icon: FiUsers, color: 'from-orange-500 to-red-500' }
  ];

  const departments = [
    {
      id: 'stem',
      name: 'STEM Department',
      icon: IoRocketOutline,
      description: 'Science, Technology, Engineering & Mathematics',
      image: academicImages.stem,
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      programs: [
        {
          name: 'Advanced Mathematics',
          description: 'Calculus, Statistics, and Advanced Algebra for future innovators',
          duration: '4 Years',
          requirements: 'Math Proficiency Test + Interview',
          courses: ['Calculus I & II', 'Statistics & Probability', 'Linear Algebra', 'Discrete Mathematics'],
          features: ['Advanced Research Projects', 'Math Competitions', 'University Partnerships']
        },
        {
          name: 'Computer Science',
          description: 'Programming, Algorithms, and Software Development mastery',
          duration: '4 Years',
          requirements: 'Logical Thinking Assessment',
          courses: ['Python Programming', 'Web Development', 'Data Structures', 'AI Fundamentals'],
          features: ['Hackathons', 'Industry Internships', 'Startup Incubation']
        },
        {
          name: 'Engineering & Robotics',
          description: 'Hands-on engineering and robotics innovation projects',
          duration: '3 Years',
          requirements: 'Physics & Math Background',
          courses: ['Mechanical Engineering', 'Electronics', 'Robotics Design', '3D Modeling'],
          features: ['Robotics Competitions', 'Prototype Development', 'Industry Visits']
        }
      ]
    },
    {
      id: 'arts',
      name: 'Arts & Humanities',
      icon: IoMusicalNotesOutline,
      description: 'Creative Arts, Languages, and Social Sciences exploration',
      image: academicImages.arts,
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500',
      programs: [
        {
          name: 'Visual Arts',
          description: 'Drawing, Painting, and Digital Art mastery',
          duration: '4 Years',
          requirements: 'Portfolio Review + Creative Test',
          courses: ['Drawing Fundamentals', 'Oil Painting', 'Digital Illustration', 'Art History'],
          features: ['Gallery Exhibitions', 'Artist Workshops', 'International Collaborations']
        },
        {
          name: 'Performing Arts',
          description: 'Music, Theater, and Dance performance excellence',
          duration: '4 Years',
          requirements: 'Audition + Performance Review',
          courses: ['Music Theory', 'Theater Production', 'Choreography', 'Vocal Training'],
          features: ['Annual Productions', 'Music Festivals', 'Talent Showcases']
        },
        {
          name: 'Literature & Languages',
          description: 'Advanced English and World Languages proficiency',
          duration: '4 Years',
          requirements: 'Language Proficiency Test',
          courses: ['World Literature', 'Creative Writing', 'French/Spanish', 'Linguistics'],
          features: ['Writing Competitions', 'Language Immersion', 'Cultural Exchange']
        }
      ]
    },
    {
      id: 'sports',
      name: 'Sports Academy',
      icon: IoBasketballOutline,
      description: 'Athletic Training and Sports Science excellence',
      image: academicImages.sports,
      color: 'from-green-500 to-teal-500',
      gradient: 'bg-gradient-to-r from-green-500 to-teal-500',
      programs: [
        {
          name: 'Basketball Program',
          description: 'Elite basketball training and championship competition',
          duration: '4 Years',
          requirements: 'Tryouts + Physical Assessment',
          courses: ['Basketball Fundamentals', 'Strength Training', 'Game Strategy', 'Sports Nutrition'],
          features: ['National Tournaments', 'Pro Player Training', 'College Scouts']
        },
        {
          name: 'Soccer Excellence',
          description: 'Professional soccer development and team dynamics',
          duration: '4 Years',
          requirements: 'Team Tryouts + Skills Assessment',
          courses: ['Soccer Techniques', 'Tactical Analysis', 'Fitness Training', 'Team Management'],
          features: ['International Tours', 'Pro Coaching', 'Talent Development']
        },
        {
          name: 'Athletic Science',
          description: 'Sports medicine and performance optimization',
          duration: '3 Years',
          requirements: 'Science & Biology Background',
          courses: ['Sports Physiology', 'Injury Prevention', 'Biomechanics', 'Nutrition Science'],
          features: ['Sports Labs', 'Research Projects', 'Professional Certifications']
        }
      ]
    }
  ];

  const curriculumFeatures = [
    {
      icon: FiTarget,
      title: 'Personalized Learning',
      description: 'Customized learning paths based on student strengths and interests with AI-driven analytics',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FiClock,
      title: 'Flexible Scheduling',
      description: 'Adaptable timetables and self-paced learning modules for optimal progress',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FiUsers,
      title: 'Collaborative Projects',
      description: 'Team-based learning experiences with real-world industry partnerships',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FiAward,
      title: 'Advanced Placement',
      description: 'College-level courses and early university credit opportunities',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const facultyMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Head of STEM',
      specialization: 'Physics & Engineering',
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      experience: '12 years',
      achievements: ['PhD in Physics', 'Published Researcher', 'STEM Award Winner'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Prof. Michael Rodriguez',
      role: 'Arts Director',
      specialization: 'Visual Arts & Design',
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      experience: '15 years',
      achievements: ['MFA in Fine Arts', 'International Exhibitions', 'Art Education Pioneer'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Coach David Kim',
      role: 'Sports Director',
      specialization: 'Athletic Training',
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115",
      experience: '10 years',
      achievements: ['Certified Trainer', 'Championship Coach', 'Sports Science Expert'],
      color: 'from-green-500 to-teal-500'
    }
  ];

  const upcomingEvents = [
    {
      title: 'STEM Innovation Fair 2024',
      date: 'March 25, 2024',
      description: 'Annual science and technology exhibition featuring student projects',
      department: 'STEM',
      type: 'Exhibition',
      image: academicImages.stem,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Spring Art Showcase',
      date: 'April 12, 2024',
      description: 'Student art exhibition and gallery opening with guest artists',
      department: 'Arts',
      type: 'Exhibition',
      image: academicImages.arts,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Championship Sports Tournament',
      date: 'May 5, 2024',
      description: 'Inter-school athletic championship with national rankings',
      department: 'Sports',
      type: 'Competition',
      image: academicImages.sports,
      color: 'from-green-500 to-teal-500'
    }
  ];

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
      </div>

      {/* Hero Section */}
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 border border-white/20 backdrop-blur-sm"
              >
                <IoSparkles className="text-yellow-400" />
                <span className="text-sm font-medium">Excellence in Education</span>
              </motion.div>

              <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Academic
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Excellence
                </span>
              </h1>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">
                Discover our comprehensive academic programs designed to nurture 
                intellectual curiosity, critical thinking, and lifelong learning skills 
                for success in the modern world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 text-lg border border-white/20"
                >
                  <FiDownload className="text-xl" />
                  Download Curriculum
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 flex items-center justify-center gap-3 text-lg backdrop-blur-sm"
                >
                  <FiPlay className="text-xl" />
                  Virtual Tour
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={academicImages.classroom}
                    alt="Modern Classroom"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg">State-of-the-Art Facilities</h3>
                    <p className="text-white/80 text-sm">Interactive learning environments</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {academicStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10"
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} mb-2`}>
                        <stat.icon className="text-white text-xl" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academic Departments */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Departments</span>
            </h2>
            <p className="text-white/70 text-xl max-w-3xl mx-auto">
              Explore our specialized departments offering diverse learning opportunities 
              and cutting-edge educational experiences.
            </p>
          </motion.div>

          {/* Department Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 inline-flex">
              {departments.map((dept) => (
                <motion.button
                  key={dept.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveDepartment(dept.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${
                    activeDepartment === dept.id
                      ? `bg-gradient-to-r ${dept.color} text-white shadow-lg`
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <dept.icon className="text-xl" />
                  {dept.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Department Content */}
          <AnimatePresence mode="wait">
            {departments.map((dept) => (
              activeDepartment === dept.id && (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="grid lg:grid-cols-2 gap-12 items-start"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-3 rounded-2xl bg-gradient-to-r ${dept.color}`}>
                        <dept.icon className="text-white text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">{dept.name}</h3>
                        <p className="text-white/60">{dept.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {dept.programs.map((program, index) => (
                        <motion.div
                          key={program.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                            selectedProgram === program.name
                              ? `border-gradient-to-r ${dept.color} shadow-xl`
                              : 'border-white/10 hover:border-white/20'
                          }`}
                          onClick={() => setSelectedProgram(program.name === selectedProgram ? null : program.name)}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="text-xl font-bold text-white">{program.name}</h4>
                            <div className="flex items-center gap-2 text-white/60 text-sm">
                              <FiClock className="text-lg" />
                              {program.duration}
                            </div>
                          </div>
                          <p className="text-white/70 mb-4">{program.description}</p>
                          
                          <AnimatePresence>
                            {selectedProgram === program.name && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4"
                              >
                                <div>
                                  <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                                    <FiCheckCircle className="text-green-400" />
                                    Requirements
                                  </h5>
                                  <p className="text-white/60">{program.requirements}</p>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-white mb-2">Featured Courses</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {program.courses.map((course) => (
                                      <span
                                        key={course}
                                        className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm border border-white/20"
                                      >
                                        {course}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-white mb-2">Program Features</h5>
                                  <div className="space-y-2">
                                    {program.features.map((feature, idx) => (
                                      <div key={idx} className="flex items-center gap-2 text-white/60 text-sm">
                                        <FiStar className="text-yellow-400 text-xs" />
                                        {feature}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  className={`w-full mt-4 bg-gradient-to-r ${dept.color} text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-3 border border-white/20`}
                                >
                                  Explore Program <FiArrowRight className="text-lg" />
                                </motion.button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative"
                  >
                    <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                      <Image
                        src={dept.image}
                        alt={dept.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    
                    <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 max-w-sm">
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <IoSparkles className="text-yellow-400" />
                        Department Highlights
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-white/70">
                          <FiCheckCircle className="text-green-400" />
                          State-of-the-art facilities
                        </li>
                        <li className="flex items-center gap-2 text-white/70">
                          <FiCheckCircle className="text-green-400" />
                          Expert faculty members
                        </li>
                        <li className="flex items-center gap-2 text-white/70">
                          <FiCheckCircle className="text-green-400" />
                          Industry partnerships
                        </li>
                        <li className="flex items-center gap-2 text-white/70">
                          <FiCheckCircle className="text-green-400" />
                          Research opportunities
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Curriculum Features */}
      <section className="py-20 bg-white/5 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Innovative <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Learning Approach</span>
            </h2>
            <p className="text-white/70 text-xl">
              Our curriculum is designed to prepare students for future challenges and opportunities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculumFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center hover:border-white/30 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-4`}>
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Faculty</span>
            </h2>
            <p className="text-white/70 text-xl">
              Dedicated educators and industry experts shaping future leaders
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {facultyMembers.map((faculty, index) => (
              <motion.div
                key={faculty.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 text-center group hover:border-white/30 transition-all duration-300"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden">
                  <Image
                    src={faculty.image}
                    alt={faculty.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute bottom-2 right-2 w-6 h-6 ${faculty.gradient} rounded-full border-2 border-white`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{faculty.name}</h3>
                <p className="text-blue-300 font-semibold mb-1">{faculty.role}</p>
                <p className="text-white/70 text-sm mb-3">{faculty.specialization}</p>
                <div className="text-white/60 text-sm mb-4">
                  <strong>{faculty.experience}</strong> Professional Experience
                </div>
                <div className="space-y-2">
                  {faculty.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-white/60 text-sm">
                      <FiAward className="text-yellow-400 text-xs" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Academic Events */}
      <section className="py-20 bg-white/5 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Academic Events</span>
            </h2>
            <p className="text-white/70 text-xl">
              Mark your calendar for these exciting academic events and opportunities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 group"
              >
                <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${event.color} text-white`}>
                      {event.type}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <FiCalendar className="text-blue-400 text-lg" />
                  <span className="text-white/60 text-sm">{event.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-white/10 text-white border border-white/20`}>
                    {event.department}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 text-sm"
                  >
                    Learn More <FiArrowRight className="text-lg" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-md rounded-3xl p-12 border border-white/20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Academic Journey</span>?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join our community of learners and discover your potential with our comprehensive academic programs designed for success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all border border-white/20"
              >
                Apply for Admission
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg border border-white/20 backdrop-blur-sm transition-all"
              >
                Schedule a Campus Visit
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}