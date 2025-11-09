'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, 
  FiSearch, 
  FiEdit, 
  FiTrash2, 
  FiFilter,
  FiDownload,
  FiEye,
  FiMail,
  FiPhone,
  FiUser,
  FiBook,
  FiHome,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiMapPin,
  FiCalendar,
  FiAward,
  FiHeart,
  FiUsers,
  FiBookOpen,
  FiBarChart2
} from 'react-icons/fi';

export default function StudentManager() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedForm, setSelectedForm] = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedHouse, setSelectedHouse] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  const [formData, setFormData] = useState({
    admissionNumber: '',
    name: '',
    form: 'Form 1',
    stream: 'East',
    house: 'Red',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    studentEmail: '',
    studentPhone: '',
    address: '',
    dateOfBirth: '',
    gender: 'Male',
    medicalInfo: '',
    emergencyContact: '',
    enrollmentDate: '',
    kcpeMarks: '',
    previousSchool: '',
    hobbies: '',
    academicPerformance: 'Average',
    attendance: '95%',
    disciplineRecord: 'Good'
  });

  // Forms, Streams, and Houses data
  const forms = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];
  const streams = ['East', 'West', 'North', 'South'];
  const houses = ['Red', 'Blue', 'Green', 'Yellow'];
  const academicLevels = ['Excellent', 'Good', 'Average', 'Below Average'];
  const disciplineRecords = ['Excellent', 'Good', 'Fair', 'Needs Improvement'];

  // Generate sample student data
  useEffect(() => {
    const sampleStudents = Array.from({ length: 45 }, (_, i) => {
      const form = forms[i % 4];
      const stream = streams[i % 4];
      const house = houses[i % 4];
      const gender = i % 2 === 0 ? 'Male' : 'Female';
      
      return {
        id: i + 1,
        admissionNumber: `KHS2024${String(i + 1).padStart(3, '0')}`,
        name: `Student ${i + 1}`,
        form,
        stream,
        house,
        parentName: `Parent ${i + 1}`,
        parentEmail: `parent${i + 1}@email.com`,
        parentPhone: `+2547${Math.floor(Math.random() * 90000000 + 10000000)}`,
        studentEmail: `student${i + 1}@katwanyaa.ac.ke`,
        studentPhone: `+2547${Math.floor(Math.random() * 90000000 + 10000000)}`,
        address: `Address ${i + 1}, Nairobi, Kenya`,
        dateOfBirth: `200${7 + (i % 4)}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
        gender,
        medicalInfo: i % 5 === 0 ? 'Asthma' : i % 7 === 0 ? 'Allergies' : 'None',
        emergencyContact: `+2547${Math.floor(Math.random() * 90000000 + 10000000)}`,
        enrollmentDate: `2024-01-${String((i % 28) + 1).padStart(2, '0')}`,
        kcpeMarks: `${Math.floor(Math.random() * 100) + 250}`,
        previousSchool: `Primary School ${i + 1}`,
        hobbies: ['Football', 'Music', 'Reading', 'Dancing'][i % 4],
        academicPerformance: academicLevels[i % 4],
        attendance: `${Math.floor(Math.random() * 10) + 90}%`,
        disciplineRecord: disciplineRecords[i % 4],
        status: 'Active'
      };
    });
    
    setStudents(sampleStudents);
    setFilteredStudents(sampleStudents);
  }, []);

  // Filter students
  useEffect(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.parentEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedForm !== 'all') {
      filtered = filtered.filter(student => student.form === selectedForm);
    }

    if (selectedStream !== 'all') {
      filtered = filtered.filter(student => student.stream === selectedStream);
    }

    if (selectedHouse !== 'all') {
      filtered = filtered.filter(student => student.house === selectedHouse);
    }

    setFilteredStudents(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedForm, selectedStream, selectedHouse, students]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // CRUD Operations
  const handleCreate = () => {
    setFormData({
      admissionNumber: '',
      name: '',
      form: 'Form 1',
      stream: 'East',
      house: 'Red',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      studentEmail: '',
      studentPhone: '',
      address: '',
      dateOfBirth: '',
      gender: 'Male',
      medicalInfo: '',
      emergencyContact: '',
      enrollmentDate: '',
      kcpeMarks: '',
      previousSchool: '',
      hobbies: '',
      academicPerformance: 'Average',
      attendance: '95%',
      disciplineRecord: 'Good'
    });
    setEditingStudent(null);
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setFormData({ ...student });
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowDetailModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      setStudents(students.map(student => 
        student.id === editingStudent.id 
          ? { ...formData, id: editingStudent.id }
          : student
      ));
    } else {
      const newStudent = {
        ...formData,
        id: Date.now(),
        status: 'Active'
      };
      setStudents([...students, newStudent]);
    }
    setShowModal(false);
  };

  const Pagination = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <p className="text-sm text-gray-700">
        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredStudents.length)} of {filteredStudents.length} students
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
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
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

  const PerformanceBadge = ({ level }) => {
    const colors = {
      'Excellent': 'from-green-500 to-emerald-600',
      'Good': 'from-blue-500 to-cyan-600',
      'Average': 'from-yellow-500 to-orange-600',
      'Below Average': 'from-red-500 to-pink-600'
    };

    return (
      <span className={`bg-gradient-to-r ${colors[level] || 'from-gray-500 to-gray-600'} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
        {level}
      </span>
    );
  };

  const HouseBadge = ({ house }) => {
    const colors = {
      'Red': 'from-red-500 to-pink-600',
      'Blue': 'from-blue-500 to-cyan-600',
      'Green': 'from-green-500 to-emerald-600',
      'Yellow': 'from-yellow-500 to-orange-600'
    };

    return (
      <span className={`bg-gradient-to-r ${colors[house] || 'from-gray-500 to-gray-600'} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
        {house} House
      </span>
    );
  };

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student Management
          </h1>
          <p className="text-gray-600 mt-2">Manage student records, enrollment, and academic information</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreate}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 lg:px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/25 w-full lg:w-auto justify-center"
        >
          <FiPlus className="text-lg" />
          Add Student
        </motion.button>
      </div>

      {/* Student Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Students</p>
              <p className="text-xl lg:text-3xl font-bold mt-2">{students.length}</p>
            </div>
            <FiUsers className="text-xl lg:text-2xl text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Form 4</p>
              <p className="text-xl lg:text-3xl font-bold mt-2">
                {students.filter(s => s.form === 'Form 4').length}
              </p>
            </div>
            <FiBook className="text-xl lg:text-2xl text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Avg. Attendance</p>
              <p className="text-xl lg:text-3xl font-bold mt-2">
                {Math.round(students.reduce((sum, s) => sum + parseInt(s.attendance), 0) / students.length)}%
              </p>
            </div>
            <FiBarChart2 className="text-xl lg:text-2xl text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 lg:p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Excellent Performance</p>
              <p className="text-xl lg:text-3xl font-bold mt-2">
                {students.filter(s => s.academicPerformance === 'Excellent').length}
              </p>
            </div>
            <FiAward className="text-xl lg:text-2xl text-purple-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg border border-gray-200/50">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students by name, admission number, or parent email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <select
            value={selectedForm}
            onChange={(e) => setSelectedForm(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="all">All Forms</option>
            {forms.map(form => (
              <option key={form} value={form}>{form}</option>
            ))}
          </select>

          <select
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="all">All Streams</option>
            {streams.map(stream => (
              <option key={stream} value={stream}>{stream}</option>
            ))}
          </select>

          <select
            value={selectedHouse}
            onChange={(e) => setSelectedHouse(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="all">All Houses</option>
            {houses.map(house => (
              <option key={house} value={house}>{house}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Admission</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Form/Stream</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentStudents.map((student) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleViewDetails(student)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">{student.admissionNumber}</div>
                    <HouseBadge house={student.house} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{student.form}</div>
                    <div className="text-sm text-gray-500">{student.stream} Stream</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PerformanceBadge level={student.academicPerformance} />
                    <div className="text-sm text-gray-500 mt-1">Attendance: {student.attendance}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.parentName}</div>
                    <div className="text-sm text-gray-500">{student.parentPhone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(student);
                        }}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        title="View Details"
                      >
                        <FiEye className="text-sm" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(student);
                        }}
                        className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-colors"
                        title="Edit"
                      >
                        <FiEdit className="text-sm" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(student.id);
                        }}
                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="text-sm" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <FiUsers className="mx-auto text-4xl text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No students found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredStudents.length > 0 && (
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
                    {editingStudent ? 'Edit Student' : 'Add New Student'}
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
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Admission Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.admissionNumber}
                      onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., KHS2024001"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter student's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Form *
                    </label>
                    <select
                      required
                      value={formData.form}
                      onChange={(e) => setFormData({ ...formData, form: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {forms.map(form => (
                        <option key={form} value={form}>{form}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Stream *
                    </label>
                    <select
                      required
                      value={formData.stream}
                      onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {streams.map(stream => (
                        <option key={stream} value={stream}>{stream}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      House
                    </label>
                    <select
                      value={formData.house}
                      onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {houses.map(house => (
                        <option key={house} value={house}>{house}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Enrollment Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.enrollmentDate}
                      onChange={(e) => setFormData({ ...formData, enrollmentDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      KCPE Marks
                    </label>
                    <input
                      type="number"
                      value={formData.kcpeMarks}
                      onChange={(e) => setFormData({ ...formData, kcpeMarks: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter KCPE marks"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Previous School
                    </label>
                    <input
                      type="text"
                      value={formData.previousSchool}
                      onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter previous school name"
                    />
                  </div>
                </div>

                {/* Parent Information */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Parent/Guardian Information</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Parent Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter parent's full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Parent Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.parentEmail}
                        onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter parent's email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Parent Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.parentPhone}
                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+254 XXX XXX XXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Emergency Contact *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.emergencyContact}
                        onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+254 XXX XXX XXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Academic Performance
                      </label>
                      <select
                        value={formData.academicPerformance}
                        onChange={(e) => setFormData({ ...formData, academicPerformance: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {academicLevels.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Discipline Record
                      </label>
                      <select
                        value={formData.disciplineRecord}
                        onChange={(e) => setFormData({ ...formData, disciplineRecord: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {disciplineRecords.map(record => (
                          <option key={record} value={record}>{record}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Hobbies & Interests
                      </label>
                      <input
                        type="text"
                        value={formData.hobbies}
                        onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Football, Music, Reading"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Student Email
                      </label>
                      <input
                        type="email"
                        value={formData.studentEmail}
                        onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="student@katwanyaa.ac.ke"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Student Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.studentPhone}
                        onChange={(e) => setFormData({ ...formData, studentPhone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+254 XXX XXX XXX"
                      />
                    </div>

                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address *
                      </label>
                      <textarea
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter full address"
                      />
                    </div>

                    <div className="lg:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Medical Information
                      </label>
                      <textarea
                        value={formData.medicalInfo}
                        onChange={(e) => setFormData({ ...formData, medicalInfo: e.target.value })}
                        rows="2"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Any medical conditions, allergies, or special needs"
                      />
                    </div>
                  </div>
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
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    {editingStudent ? 'Update Student' : 'Add Student'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedStudent && (
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
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Student Details</h2>
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
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                      {selectedStudent.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedStudent.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <HouseBadge house={selectedStudent.house} />
                      <PerformanceBadge level={selectedStudent.academicPerformance} />
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {selectedStudent.attendance} Attendance
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Admission: <span className="font-semibold text-gray-800">{selectedStudent.admissionNumber}</span></p>
                        <p className="text-gray-600">Form: <span className="font-semibold text-gray-800">{selectedStudent.form} {selectedStudent.stream}</span></p>
                      </div>
                      <div>
                        <p className="text-gray-600">Gender: <span className="font-semibold text-gray-800">{selectedStudent.gender}</span></p>
                        <p className="text-gray-600">KCPE: <span className="font-semibold text-gray-800">{selectedStudent.kcpeMarks} marks</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiUser className="text-blue-500" />
                        Personal Information
                      </h4>
                      <div className="space-y-1 text-sm bg-gray-50 p-4 rounded-xl">
                        <p><span className="font-medium">Date of Birth:</span> {selectedStudent.dateOfBirth}</p>
                        <p><span className="font-medium">Enrollment Date:</span> {selectedStudent.enrollmentDate}</p>
                        <p><span className="font-medium">Previous School:</span> {selectedStudent.previousSchool}</p>
                        <p><span className="font-medium">Hobbies:</span> {selectedStudent.hobbies}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiAward className="text-blue-500" />
                        Academic Information
                      </h4>
                      <div className="space-y-1 text-sm bg-gray-50 p-4 rounded-xl">
                        <p><span className="font-medium">Performance:</span> {selectedStudent.academicPerformance}</p>
                        <p><span className="font-medium">Attendance:</span> {selectedStudent.attendance}</p>
                        <p><span className="font-medium">Discipline:</span> {selectedStudent.disciplineRecord}</p>
                        <p><span className="font-medium">KCPE Marks:</span> {selectedStudent.kcpeMarks}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiUsers className="text-blue-500" />
                        Parent/Guardian
                      </h4>
                      <div className="space-y-1 text-sm bg-gray-50 p-4 rounded-xl">
                        <p><span className="font-medium">Name:</span> {selectedStudent.parentName}</p>
                        <p><span className="font-medium">Email:</span> {selectedStudent.parentEmail}</p>
                        <p><span className="font-medium">Phone:</span> {selectedStudent.parentPhone}</p>
                        <p><span className="font-medium">Emergency:</span> {selectedStudent.emergencyContact}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiMapPin className="text-blue-500" />
                        Contact & Medical
                      </h4>
                      <div className="space-y-1 text-sm bg-gray-50 p-4 rounded-xl">
                        <p><span className="font-medium">Student Email:</span> {selectedStudent.studentEmail}</p>
                        <p><span className="font-medium">Student Phone:</span> {selectedStudent.studentPhone}</p>
                        <p><span className="font-medium">Address:</span> {selectedStudent.address}</p>
                        <p><span className="font-medium">Medical Info:</span> {selectedStudent.medicalInfo}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 mt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      handleEdit(selectedStudent);
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Edit Student
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