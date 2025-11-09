'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiSearch, 
  FiEdit, 
  FiTrash2, 
  FiMail,
  FiPhone,
  FiUser,
  FiAward,
  FiBook,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiX,
  FiMapPin,
  FiCalendar,
  FiBriefcase,
  FiEye,
  FiStar,
  FiShield
} from 'react-icons/fi';
import { 
  IoPeopleCircle,
  IoRocketOutline,
  IoSchoolOutline
} from 'react-icons/io5';

export default function StaffManager() {
  const [staff, setStaff] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    role: 'Teacher',
    position: '',
    department: 'Science',
    email: '',
    phone: '',
    image: '',
    experience: '',
    qualifications: '',
    specialization: '',
    dateOfBirth: '',
    joinDate: '',
    address: '',
    emergencyContact: '',
    bio: '',
    responsibilities: [],
    status: 'active',
    reportsTo: ''
  });

  // Check if principal exists
  const principalExists = staff.some(s => s.role === 'Principal');
  const deputyPrincipalsCount = staff.filter(s => s.role === 'Deputy Principal').length;

  // Enhanced sample data with realistic staff structure
  useEffect(() => {
    const sampleStaff = [
      {
        id: 1,
        name: 'Dr. James Mwangi',
        role: 'Principal',
        position: 'School Principal',
        department: 'Administration',
        email: 'principal@katwanyaa.ac.ke',
        phone: '+254712345678',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
        experience: '25 years',
        qualifications: 'PhD in Educational Leadership, M.Ed',
        specialization: 'Educational Administration',
        dateOfBirth: '1970-05-15',
        joinDate: '2010-01-15',
        address: 'P.O Box 123, Nairobi',
        emergencyContact: '+254723456789',
        bio: 'Dedicated educational leader with 25 years of experience in school administration and curriculum development.',
        responsibilities: ['Overall School Management', 'Strategic Planning', 'Staff Supervision'],
        status: 'active'
      },
      {
        id: 2,
        name: 'Mrs. Sarah Kamau',
        role: 'Deputy Principal',
        position: 'Deputy Principal - Academics',
        department: 'Administration',
        email: 'deputy.academics@katwanyaa.ac.ke',
        phone: '+254712345679',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        experience: '20 years',
        qualifications: 'M.Ed in Curriculum Development, B.Ed',
        specialization: 'Curriculum Development',
        dateOfBirth: '1975-08-22',
        joinDate: '2012-03-10',
        address: 'P.O Box 456, Nairobi',
        emergencyContact: '+254723456790',
        bio: 'Passionate about academic excellence and student development.',
        responsibilities: ['Academic Programs', 'Teacher Supervision', 'Performance Monitoring'],
        status: 'active',
        reportsTo: 'Principal'
      }
    ];

    // Add more sample staff
    for (let i = 3; i <= 32; i++) {
      sampleStaff.push({
        id: i,
        name: `Staff Member ${i}`,
        role: ['Teacher', 'HOD', 'Counselor', 'Librarian', 'Support Staff'][Math.floor(Math.random() * 5)],
        position: ['Senior Teacher', 'Class Teacher', 'Subject Head', 'Guidance Counselor'][Math.floor(Math.random() * 4)],
        department: ['Science', 'Mathematics', 'Languages', 'Humanities', 'Sports'][Math.floor(Math.random() * 5)],
        email: `staff${i}@katwanyaa.ac.ke`,
        phone: `+2547${Math.floor(Math.random() * 90000000 + 10000000)}`,
        image: `https://images.unsplash.com/photo-15${i % 10}${(i % 9) + 1}?w=150&h=150&fit=crop&crop=face`,
        experience: `${Math.floor(Math.random() * 20) + 5} years`,
        qualifications: ['M.Ed', 'B.Ed', 'PhD', 'MSc', 'BSc'][Math.floor(Math.random() * 5)],
        specialization: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'][Math.floor(Math.random() * 6)],
        dateOfBirth: `19${Math.floor(Math.random() * 30) + 70}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        joinDate: `202${Math.floor(Math.random() * 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        address: `Address ${i}, Nairobi`,
        emergencyContact: `+2547${Math.floor(Math.random() * 90000000 + 10000000)}`,
        bio: 'Dedicated educator with passion for teaching and student development.',
        responsibilities: ['Teaching', 'Curriculum Development', 'Student Assessment'],
        status: ['active', 'on-leave', 'inactive'][Math.floor(Math.random() * 3)],
        reportsTo: ['Principal', 'Deputy Principal'][Math.floor(Math.random() * 2)]
      });
    }

    setStaff(sampleStaff);
    setFilteredStaff(sampleStaff);
    setTeachers(sampleStaff.filter(s => s.role === 'Teacher'));
  }, []);

  // Filtering and pagination
  useEffect(() => {
    let filtered = staff;

    if (searchTerm) {
      filtered = filtered.filter(staffMember =>
        staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staffMember.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staffMember.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(staffMember => staffMember.department === selectedDepartment);
    }

    if (selectedRole !== 'all') {
      filtered = filtered.filter(staffMember => staffMember.role === selectedRole);
    }

    setFilteredStaff(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedRole, staff]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // CRUD Operations
  const handleCreate = () => {
    setFormData({
      name: '',
      role: 'Teacher',
      position: '',
      department: 'Science',
      email: '',
      phone: '',
      image: '',
      experience: '',
      qualifications: '',
      specialization: '',
      dateOfBirth: '',
      joinDate: '',
      address: '',
      emergencyContact: '',
      bio: '',
      responsibilities: [],
      status: 'active',
      reportsTo: ''
    });
    setEditingStaff(null);
    setShowModal(true);
  };

  const handleEdit = (staffMember) => {
    setFormData({ ...staffMember });
    setEditingStaff(staffMember);
    setShowModal(true);
  };

  const handleViewDetails = (staffMember) => {
    setSelectedStaff(staffMember);
    setShowDetailModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      setStaff(staff.filter(staffMember => staffMember.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation for unique roles
    if (formData.role === 'Principal' && principalExists && !editingStaff) {
      alert('A Principal already exists. There can only be one Principal.');
      return;
    }

    if (formData.role === 'Deputy Principal' && deputyPrincipalsCount >= 2 && !editingStaff) {
      alert('Maximum of two Deputy Principals allowed.');
      return;
    }

    if (editingStaff) {
      setStaff(staff.map(staffMember => 
        staffMember.id === editingStaff.id 
          ? { ...formData, id: editingStaff.id }
          : staffMember
      ));
    } else {
      const newStaff = {
        ...formData,
        id: Date.now(),
        image: formData.image || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`
      };
      setStaff([...staff, newStaff]);
    }
    setShowModal(false);
  };

  const departments = [
    'Administration', 'Science', 'Mathematics', 'Languages', 
    'Humanities', 'Sports', 'Guidance', 'Board of Management'
  ];

  const roles = [
    'Teacher', 'Principal', 'Deputy Principal', 'HOD', 
    'Counselor', 'Librarian', 'Accountant', 'Support Staff'
  ];

  // Get available supervisors based on role
  const getAvailableSupervisors = () => {
    return staff.filter(s => 
      s.role === 'Principal' || s.role === 'Deputy Principal'
    );
  };

  const Pagination = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <p className="text-sm text-gray-700">
        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStaff.length)} of {filteredStaff.length} staff members
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <FiChevronLeft className="text-lg" />
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
                <span className="px-2 text-gray-500">...</span>
              )}
              <button
                onClick={() => paginate(page)}
                className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25'
                    : 'text-gray-700 hover:bg-gray-100'
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
          className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          <FiChevronRight className="text-lg" />
        </button>
      </div>
    </div>
  );

  const RoleBadge = ({ role }) => {
    const roleColors = {
      'Principal': 'from-purple-500 to-purple-600',
      'Deputy Principal': 'from-blue-500 to-blue-600',
      'HOD': 'from-green-500 to-green-600',
      'Teacher': 'from-orange-500 to-orange-600',
      'Counselor': 'from-pink-500 to-pink-600',
      'Librarian': 'from-indigo-500 to-indigo-600',
      'Support Staff': 'from-gray-500 to-gray-600'
    };

    return (
      <span className={`bg-gradient-to-r ${roleColors[role] || 'from-gray-500 to-gray-600'} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
        {role}
      </span>
    );
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Staff & BOM Management
          </h1>
          <p className="text-gray-600 mt-2">Manage teaching staff, administration, and board members</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 lg:px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-orange-500/25 w-full lg:w-auto justify-center"
        >
          <FiPlus className="text-lg" />
          Add Staff
        </motion.button>
      </div>

      {/* Staff Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Total Staff</p>
              <p className="text-xl lg:text-3xl font-bold mt-2">{staff.length}</p>
            </div>
            <IoPeopleCircle className="text-xl lg:text-2xl text-orange-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Teaching Staff</p>
              <p className="text-xl lg:text-3xl font-bold mt-2">
                {staff.filter(s => s.role === 'Teacher').length}
              </p>
            </div>
            <FiBook className="text-xl lg:text-2xl text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Administration</p>
              <p className="text-xl lg:text-3xl font-bold mt-2">
                {staff.filter(s => s.department === 'Administration').length}
              </p>
            </div>
            <FiAward className="text-xl lg:text-2xl text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Leadership</p>
              <p className="text-xl lg:text-3xl font-bold mt-2">
                {staff.filter(s => ['Principal', 'Deputy Principal'].includes(s.role)).length}
              </p>
            </div>
            <FiShield className="text-xl lg:text-2xl text-purple-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-200/50">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
            />
          </div>

          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {currentStaff.map((staffMember) => (
          <motion.div
            key={staffMember.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-200/50 text-center group cursor-pointer"
            onClick={() => handleViewDetails(staffMember)}
          >
            <div className="relative inline-block mb-4">
              <img
                src={staffMember.image}
                alt={staffMember.name}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl object-cover mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg"
              />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                staffMember.status === 'active' ? 'bg-green-500' :
                staffMember.status === 'on-leave' ? 'bg-yellow-500' :
                'bg-gray-500'
              }`}></div>
            </div>
            
            <h3 className="font-bold text-gray-800 text-base lg:text-lg mb-1 group-hover:text-orange-600 transition-colors">
              {staffMember.name}
            </h3>
            <div className="mb-2">
              <RoleBadge role={staffMember.role} />
            </div>
            <p className="text-gray-600 text-sm mb-3">{staffMember.department}</p>
            
            <div className="space-y-2 mb-4 text-xs">
              <div className="flex items-center justify-center gap-1 text-gray-600">
                <FiAward className="text-yellow-500" />
                <span>{staffMember.experience}</span>
              </div>
              <div className="text-gray-600">
                {staffMember.qualifications}
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(staffMember);
                }}
                className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-colors"
                title="View Details"
              >
                <FiEye className="text-sm" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(staffMember);
                }}
                className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-xl transition-colors"
                title="Edit"
              >
                <FiEdit className="text-sm" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(staffMember.id);
                }}
                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors"
                title="Delete"
              >
                <FiTrash2 className="text-sm" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {filteredStaff.length > 0 && (
        <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-200/50">
          <Pagination />
        </div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="text-xl text-gray-600" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Role *
                    </label>
                    <select
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {roles.map(role => (
                        <option 
                          key={role} 
                          value={role}
                          disabled={
                            (role === 'Principal' && principalExists && !editingStaff) ||
                            (role === 'Deputy Principal' && deputyPrincipalsCount >= 2 && !editingStaff)
                          }
                        >
                          {role}
                          {(role === 'Principal' && principalExists && !editingStaff) && ' (Already exists)'}
                          {(role === 'Deputy Principal' && deputyPrincipalsCount >= 2 && !editingStaff) && ' (Max reached)'}
                        </option>
                      ))}
                    </select>
                    <div className="mt-1 text-xs text-gray-500">
                      {formData.role === 'Principal' && principalExists && !editingStaff && (
                        <span className="text-red-500">A Principal already exists</span>
                      )}
                      {formData.role === 'Deputy Principal' && deputyPrincipalsCount >= 2 && !editingStaff && (
                        <span className="text-red-500">Maximum of 2 Deputy Principals allowed</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., Senior Teacher"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reports To
                    </label>
                    <select
                      value={formData.reportsTo}
                      onChange={(e) => setFormData({ ...formData, reportsTo: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select Supervisor</option>
                      {getAvailableSupervisors().map(supervisor => (
                        <option key={supervisor.id} value={supervisor.name}>
                          {supervisor.name} ({supervisor.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="staff@katwanyaa.ac.ke"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Join Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.joinDate}
                      onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Experience
                    </label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., 5 years"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Qualifications
                    </label>
                    <input
                      type="text"
                      value={formData.qualifications}
                      onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., M.Ed, B.Ed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Specialization
                    </label>
                    <input
                      type="text"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., Mathematics, Physics"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="+254 XXX XXX XXX"
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows="2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter full address"
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Brief biography about the staff member"
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.status === 'active'}
                      onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'active' : 'inactive' })}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Active Staff Member</span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    {editingStaff ? 'Update Staff Member' : 'Add Staff Member'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Staff Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedStaff && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Staff Details</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FiX className="text-xl text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <img
                      src={selectedStaff.image}
                      alt={selectedStaff.name}
                      className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedStaff.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <RoleBadge role={selectedStaff.role} />
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedStaff.status === 'active' ? 'bg-green-100 text-green-800' :
                        selectedStaff.status === 'on-leave' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedStaff.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-1">{selectedStaff.position}</p>
                    <p className="text-gray-600">{selectedStaff.department} Department</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiMail className="text-orange-500" />
                        Contact Information
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Email:</span> {selectedStaff.email}</p>
                        <p><span className="font-medium">Phone:</span> {selectedStaff.phone}</p>
                        <p><span className="font-medium">Emergency:</span> {selectedStaff.emergencyContact}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <IoSchoolOutline className="text-orange-500" />
                        Qualifications
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Experience:</span> {selectedStaff.experience}</p>
                        <p><span className="font-medium">Qualifications:</span> {selectedStaff.qualifications}</p>
                        <p><span className="font-medium">Specialization:</span> {selectedStaff.specialization}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiCalendar className="text-orange-500" />
                        Personal Details
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Date of Birth:</span> {selectedStaff.dateOfBirth}</p>
                        <p><span className="font-medium">Join Date:</span> {selectedStaff.joinDate}</p>
                        {selectedStaff.reportsTo && (
                          <p><span className="font-medium">Reports To:</span> {selectedStaff.reportsTo}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiMapPin className="text-orange-500" />
                        Address
                      </h4>
                      <p className="text-sm">{selectedStaff.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-700 mb-2">Bio</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedStaff.bio}</p>
                </div>

                {selectedStaff.responsibilities && selectedStaff.responsibilities.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-700 mb-2">Key Responsibilities</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {selectedStaff.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-4 pt-6 mt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleEdit(selectedStaff);
                    }}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Edit Staff
                  </button>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}