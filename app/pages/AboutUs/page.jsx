'use client';
import { motion } from 'framer-motion';
import { 
  FiTarget, 
  FiEye, 
  FiAward, 
  FiUsers, 
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiHeart,
  FiBook,
  FiActivity
} from 'react-icons/fi';
import { 
  IoRocketOutline,
  IoLibraryOutline,
  IoPeopleOutline,
  IoStatsChartOutline
} from 'react-icons/io5';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('../../components/mapcomponent/page'), {
  ssr: false,
  loading: () => (
    <div className="h-96 rounded-2xl bg-gray-200 animate-pulse flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  )
});

export default function AboutUsPage() {
  const schoolStats = [
    { value: '25+', label: 'Years of Excellence', icon: FiAward, color: 'from-yellow-500 to-orange-500' },
    { value: '1,200+', label: 'Students Enrolled', icon: FiUsers, color: 'from-blue-500 to-cyan-500' },
    { value: '98%', label: 'Success Rate', icon: IoStatsChartOutline, color: 'from-green-500 to-emerald-500' },
    { value: '50+', label: 'Qualified Teachers', icon: IoPeopleOutline, color: 'from-purple-500 to-pink-500' }
  ];

  const values = [
    {
      icon: FiBook,
      title: 'Academic Excellence',
      description: 'Commitment to highest educational standards and continuous improvement in teaching methodologies.'
    },
    {
      icon: FiHeart,
      title: 'Character Building',
      description: 'Nurturing moral values, discipline, and responsible citizenship among students.'
    },
    {
      icon: IoRocketOutline,
      title: 'Innovation',
      description: 'Embracing technology and innovative approaches to prepare students for the future.'
    },
    {
      icon: FiActivity,
      title: 'Holistic Development',
      description: 'Balancing academics with sports, arts, and co-curricular activities for all-round growth.'
    }
  ];

  const leadershipTeam = [
    {
      name: 'Mr. John Mwangi',
      role: 'Principal',
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400",
      experience: '15+ years in education',
      quote: 'Education is the most powerful weapon which you can use to change the world.'
    },
    {
      name: 'Mrs. Grace Wanjiku',
      role: 'Deputy Principal - Academics',
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      experience: '12+ years teaching experience',
      quote: 'Every student can learn, just not on the same day or in the same way.'
    },
    {
      name: 'Mr. David Ochieng',
      role: 'Deputy Principal - Administration',
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      experience: '10+ years in school management',
      quote: 'Great schools are built on strong administrative foundations and dedicated staff.'
    }
  ];

  const locationInfo = {
    address: 'Kambusu, Tala Kangundo Road, Machakos County, Kenya',
    coordinates: '-1.246601, 37.345945',
    phone: '+254 712 345 678',
    email: 'info@katwanyaa.ac.ke',
    hours: 'Mon - Fri: 7:30 AM - 4:30 PM'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden pt-20">
      {/* Animated Background Elements - Same as Homepage */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200"
            alt="School Campus"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 text-white overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                About
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Katwanyaa High
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                For over 25 years, Katwanyaa High School has been a beacon of academic excellence 
                in Machakos County, nurturing future leaders through quality education, character 
                building, and holistic development.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all"
              >
                Schedule a Visit
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Image
                src="https://images.unsplash.com/photo-1562774053-701939374585?w=600"
                alt="Katwanyaa High School Campus"
                width={600}
                height={400}
                className="rounded-2xl w-full h-80 object-cover shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Stats */}
      <section className="relative py-20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {schoolStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} mb-4`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6">
                <FiTarget className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                To provide quality education that empowers students with knowledge, skills, and values 
                to excel academically, develop morally, and contribute positively to society through 
                innovative teaching methods and a supportive learning environment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
                <FiEye className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                To be a center of academic excellence that produces well-rounded, innovative, 
                and responsible global citizens who are equipped to face future challenges and 
                make meaningful contributions to their communities and the world at large.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-white/60 text-xl max-w-3xl mx-auto">
              The foundation upon which we build character and shape futures
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
                  <value.icon className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="relative py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Leadership Team</h2>
            <p className="text-white/60 text-xl">
              Meet the dedicated professionals guiding our institution
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadershipTeam.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{leader.name}</h3>
                <p className="text-blue-300 font-semibold mb-2">{leader.role}</p>
                <p className="text-white/60 text-sm mb-4">{leader.experience}</p>
                <blockquote className="text-white/70 italic text-sm border-l-4 border-blue-500 pl-4 py-2">
                  "{leader.quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact with Map */}
      <section className="relative py-20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Visit Our Campus</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-white/80">
                  <FiMapPin className="text-red-400 text-xl" />
                  <span>{locationInfo.address}</span>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <FiPhone className="text-green-400 text-xl" />
                  <span>{locationInfo.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <FiMail className="text-yellow-400 text-xl" />
                  <span>{locationInfo.email}</span>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <FiClock className="text-purple-400 text-xl" />
                  <span>{locationInfo.hours}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all"
              >
                Get Directions
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Our Location</h3>
              
              {/* Map Component */}
              <MapComponent />
              
              <p className="text-white/70 text-sm mt-4">
                Located in the heart of Kambusu along Kangundo Road, our campus is easily 
                accessible from Tala town and surrounding areas in Machakos County.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}