'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiCalendar,
  FiBook,
  FiUser,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
  FiEye,
  FiEdit,
  FiUpload,
  FiBarChart2,
  FiAward,
  FiTrendingUp,
  FiX,
  FiTarget,
  FiFileText,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import { 
  IoSparkles,
  IoDocumentText,
  IoTime,
  IoCheckmarkDone
} from 'react-icons/io5';

export default function StudentAssignmentPortal() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const assignmentsPerPage = 4;

  // Fix hydration by using useEffect to set client-side only after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // deterministic formatter to avoid hydration mismatch (always returns DD/MM/YYYY)
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    const pad = (n) => String(n).padStart(2, '0');
    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const assignments = [
    {
      id: 1,
      title: 'Mathematics Assignment - Algebra',
      subject: 'Mathematics',
      class: 'Form 1',
      teacher: 'Mr. Michael Njoroge',
      dueDate: '2024-03-20',
      status: 'assigned',
      description: 'Solve quadratic equations and simultaneous equations from pages 45-50. Show all working steps clearly. This assignment focuses on developing algebraic thinking and problem-solving skills essential for advanced mathematics.',
      attachments: ['worksheet.pdf', 'examples.docx'],
      assignmentFiles: ['algebra_problems.pdf', 'solution_template.docx', 'practice_questions.pdf'],
      points: 100,
      priority: 'high',
      estimatedTime: '2 hours',
      instructions: 'Complete all problems showing step-by-step solutions. Submit your work by the deadline. Ensure all calculations are clearly shown and final answers are boxed.',
      additionalWork: 'Optional: Try the bonus problems on page 52 for extra credit. Research real-world applications of quadratic equations.',
      teacherRemarks: 'Focus on proper formatting and show all calculations clearly. Pay special attention to the discriminant in quadratic equations.',
      dateAssigned: '2024-03-10',
      learningObjectives: [
        'Solve quadratic equations using factorization',
        'Apply the quadratic formula correctly',
        'Solve simultaneous equations algebraically',
        'Interpret solutions in real-world contexts'
      ]
    },
    {
      id: 2,
      title: 'English Composition - Argumentative Essay',
      subject: 'English',
      class: 'Form 2',
      teacher: 'Mrs. Elizabeth Muthoni',
      dueDate: '2024-03-18',
      status: 'reviewed',
      description: 'Write a 500-word composition on "The Importance of Education" with proper grammar and structure. Develop a clear thesis statement and support it with relevant examples.',
      attachments: ['guidelines.pdf'],
      assignmentFiles: ['writing_prompt.pdf', 'rubric.docx', 'sample_essays.zip'],
      points: 50,
      submittedDate: '2024-03-15',
      grade: 'A-',
      feedback: 'Excellent work! Great structure and vocabulary. Consider expanding on the economic benefits in your next assignment. Your thesis statement was clear and well-supported.',
      priority: 'medium',
      instructions: 'Use formal academic language and include at least three supporting arguments. Include an introduction, three body paragraphs, and a conclusion.',
      teacherRemarks: 'Pay attention to paragraph structure and thesis statement development. Focus on transitional phrases between paragraphs.',
      additionalWork: 'Read the recommended articles on academic writing style. Practice writing counterarguments for your position.',
      dateAssigned: '2024-03-05',
      learningObjectives: [
        'Develop a clear thesis statement',
        'Structure an argumentative essay',
        'Use persuasive language effectively',
        'Incorporate evidence to support arguments'
      ]
    },
    {
      id: 3,
      title: 'Biology Practical Report - Plant Cell Structure',
      subject: 'Biology',
      class: 'Form 3',
      teacher: 'Mr. Peter Kamau',
      dueDate: '2024-03-25',
      status: 'assigned',
      description: 'Write a detailed report on the plant cell structure practical with labeled diagrams. Include observations from microscope work and analysis of cell components.',
      attachments: ['lab_manual.pdf', 'template.docx'],
      assignmentFiles: ['lab_instructions.pdf', 'report_template.docx', 'microscope_images.zip', 'cell_diagrams.pdf'],
      points: 80,
      priority: 'high',
      estimatedTime: '3 hours',
      instructions: 'Include microscope observations, labeled diagrams, and conclusion sections. Follow the scientific method format for your report.',
      teacherRemarks: 'Ensure all diagrams are properly labeled and referenced in text. Pay attention to scale in your drawings.',
      additionalWork: 'Research recent discoveries in cell biology for bonus points. Compare plant and animal cell structures.',
      dateAssigned: '2024-03-12',
      learningObjectives: [
        'Identify plant cell organelles',
        'Use microscope techniques effectively',
        'Create accurate biological drawings',
        'Write scientific reports following proper format'
      ]
    },
    {
      id: 4,
      title: 'Physics Calculations - Mechanics',
      subject: 'Physics',
      class: 'Form 4',
      teacher: 'Dr. Sarah Chen',
      dueDate: '2024-03-22',
      status: 'extended',
      description: 'Solve mechanics problems from chapter 3 including motion and forces calculations. Apply Newton\'s laws to various scenarios.',
      attachments: ['problems.pdf'],
      assignmentFiles: ['physics_problems.pdf', 'formula_sheet.pdf', 'worked_examples.pdf'],
      points: 70,
      priority: 'urgent',
      estimatedTime: '1.5 hours',
      instructions: 'Show all formulas used and step-by-step calculations. Include free-body diagrams where applicable.',
      teacherRemarks: 'EXTENDED DEADLINE: New due date is 2024-03-24. Use the provided formula sheet and show all working.',
      additionalWork: 'Practice problems from chapter 4 for better preparation. Research real-world applications of Newton\'s laws.',
      dateAssigned: '2024-03-08',
      learningObjectives: [
        'Apply Newton\'s laws of motion',
        'Solve kinematics problems',
        'Draw and interpret free-body diagrams',
        'Calculate forces in various scenarios'
      ]
    },
    {
      id: 5,
      title: 'History Research Paper - African Independence Movements',
      subject: 'History',
      class: 'Form 3',
      teacher: 'Mr. Robert Kipchoge',
      dueDate: '2024-04-01',
      status: 'assigned',
      description: 'Research and write about the independence movements in Africa with proper citations. Focus on the political, social, and economic factors that influenced these movements.',
      attachments: ['topics.pdf', 'citation_guide.docx'],
      assignmentFiles: ['research_guidelines.pdf', 'source_materials.zip', 'primary_sources.pdf'],
      points: 100,
      priority: 'medium',
      estimatedTime: '4 hours',
      instructions: 'Minimum 1500 words with at least 5 credible sources using APA format. Include both primary and secondary sources.',
      teacherRemarks: 'Focus on primary sources and include a bibliography. Analyze the long-term impacts of independence movements.',
      additionalWork: 'Optional: Compare two different independence movements. Create a timeline of key events.',
      dateAssigned: '2024-03-15',
      learningObjectives: [
        'Analyze historical events and their causes',
        'Use primary and secondary sources effectively',
        'Write a research paper with proper citations',
        'Evaluate the impact of historical events'
      ]
    },
    {
      id: 6,
      title: 'Chemistry Lab Report - Chemical Reactions',
      subject: 'Chemistry',
      class: 'Form 4',
      teacher: 'Dr. Sarah Chen',
      dueDate: '2024-03-28',
      status: 'assigned',
      description: 'Document chemical reactions and their practical applications with safety precautions. Include observations and balanced chemical equations.',
      attachments: ['experiment_guide.pdf'],
      assignmentFiles: ['lab_procedures.pdf', 'safety_guidelines.pdf', 'reaction_tables.docx'],
      points: 90,
      priority: 'high',
      estimatedTime: '2.5 hours',
      instructions: 'Follow all safety procedures. Record detailed observations and write balanced equations for all reactions.',
      teacherRemarks: 'Emphasize safety precautions and proper lab techniques. Include error analysis in your conclusion.',
      additionalWork: 'Research industrial applications of these chemical reactions.',
      dateAssigned: '2024-03-14',
      learningObjectives: [
        'Balance chemical equations',
        'Follow laboratory safety procedures',
        'Record scientific observations accurately',
        'Analyze chemical reaction outcomes'
      ]
    }
  ];

  const classes = ['all', 'Form 1', 'Form 2', 'Form 3', 'Form 4'];
  const subjects = ['all', 'Mathematics', 'English', 'Biology', 'Physics', 'Chemistry', 'History'];
  const statuses = ['all', 'assigned', 'reviewed', 'extended'];

  const filteredAssignments = assignments.filter(assignment => {
    const matchesClass = selectedClass === 'all' || assignment.class === selectedClass;
    const matchesSubject = selectedSubject === 'all' || assignment.subject === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || assignment.status === selectedStatus;
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesClass && matchesSubject && matchesStatus && matchesSearch;
  });

  // Pagination logic
  const indexOfLastAssignment = currentPage * assignmentsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
  const currentAssignments = filteredAssignments.slice(indexOfFirstAssignment, indexOfLastAssignment);
  const totalPages = Math.ceil(filteredAssignments.length / assignmentsPerPage);

  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the assignments section
    window.scrollTo({
      top: document.getElementById('assignments-section').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reviewed': return 'from-green-500 to-emerald-500';
      case 'assigned': return 'from-blue-500 to-cyan-500';
      case 'extended': return 'from-orange-500 to-amber-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'reviewed': return <IoCheckmarkDone className="text-white" />;
      case 'assigned': return <IoTime className="text-white" />;
      case 'extended': return <FiAlertCircle className="text-white" />;
      default: return <FiClock className="text-white" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const clearFilters = () => {
    setSelectedClass('all');
    setSelectedSubject('all');
    setSelectedStatus('all');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const downloadAssignment = (assignment) => {
    // Simulate download functionality
    console.log('Downloading assignment:', assignment.title);
    alert(`Downloading assignment files for: ${assignment.title}`);
  };

  // Don't render anything until client-side to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-xl">Loading Assignment Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-20 overflow-hidden">
      {/* Animated Background */}
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

      {/* Header */}
      <section className="relative py-16 z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 border border-white/20 backdrop-blur-sm"
            >
              <IoSparkles className="text-yellow-400" />
              <span className="text-sm font-medium">Student Assignment Portal</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Assignment <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Viewer</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Access your assignments, view teacher instructions, download materials, and track deadlines in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="relative z-10 pb-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {assignments.filter(a => a.status === 'assigned').length}
              </div>
              <div className="text-blue-300 font-semibold flex items-center justify-center gap-2">
                <IoTime className="text-lg" />
                Assigned
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {assignments.filter(a => a.status === 'reviewed').length}
              </div>
              <div className="text-green-300 font-semibold flex items-center justify-center gap-2">
                <IoCheckmarkDone className="text-lg" />
                Reviewed
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {assignments.filter(a => a.status === 'extended').length}
              </div>
              <div className="text-orange-300 font-semibold flex items-center justify-center gap-2">
                <FiAlertCircle className="text-lg" />
                Extended
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-2xl font-bold text-white mb-2">
                {assignments.length}
              </div>
              <div className="text-purple-300 font-semibold flex items-center justify-center gap-2">
                <IoDocumentText className="text-lg" />
                Total
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search - ALWAYS OPEN */}
      <section className="relative z-10 py-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 text-xl" />
                <input
                  type="text"
                  placeholder="Search assignments by title or teacher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>

              {/* Clear Filters Button */}
              {(selectedClass !== 'all' || selectedSubject !== 'all' || selectedStatus !== 'all') && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-2xl border border-white/20 transition-colors backdrop-blur-sm"
                >
                  <FiX className="text-lg" />
                  Clear Filters
                </motion.button>
              )}
            </div>

            {/* Advanced Filters - ALWAYS VISIBLE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Class Filter */}
              <div>
                <label className=" text-white/60 text-sm font-semibold mb-2 flex items-center gap-2">
                  <FiUser className="text-white/40" />
                  Class
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                >
                  {classes.map(cls => (
                    <option key={cls} value={cls} className="bg-slate-800">
                      {cls === 'all' ? 'All Classes' : cls}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div>
                <label className=" text-white/60 text-sm font-semibold mb-2 flex items-center gap-2">
                  <FiBook className="text-white/40" />
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject} className="bg-slate-800">
                      {subject === 'all' ? 'All Subjects' : subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className=" text-white/60 text-sm font-semibold mb-2 flex items-center gap-2">
                  <FiCheckCircle className="text-white/40" />
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                >
                  {statuses.map(status => (
                    <option key={status} value={status} className="bg-slate-800">
                      {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Assignments Grid */}
      <section id="assignments-section" className="relative z-10 py-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex justify-between items-center"
          >
            <h2 className="text-2xl font-bold text-white">
              Your Assignments <span className="text-blue-400">({filteredAssignments.length})</span>
            </h2>
            <div className="text-white/60 text-sm">
              {selectedClass !== 'all' && `${selectedClass} • `}
              {selectedSubject !== 'all' && `${selectedSubject} • `}
              {selectedStatus !== 'all' && `${selectedStatus}`}
            </div>
          </motion.div>

          {filteredAssignments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
            >
              <FiBook className="text-6xl text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/80 mb-2">No assignments found</h3>
              <p className="text-white/60">Try adjusting your filters or search terms</p>
            </motion.div>
          ) : (
            <>
              <div className="grid gap-6 mb-8">
                {currentAssignments.map((assignment, index) => (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:border-white/30 transition-all duration-300 group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <div className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getStatusColor(assignment.status)} text-white flex items-center gap-2`}>
                            {getStatusIcon(assignment.status)}
                            <span className="capitalize">{assignment.status}</span>
                          </div>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold border border-blue-500/30">
                            {assignment.class}
                          </span>
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold border border-purple-500/30">
                            {assignment.subject}
                          </span>
                          {assignment.priority && (
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getPriorityColor(assignment.priority)}`}>
                              {assignment.priority} priority
                            </span>
                          )}
                        </div>
                        
                        {/* Title and Description */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                          {assignment.title}
                        </h3>
                        <p className="text-white/70 mb-4 leading-relaxed">{assignment.description}</p>
                        
                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                          <div className="flex items-center gap-2">
                            <FiUser className="text-white/40" />
                            <span>{assignment.teacher}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiCalendar className="text-white/40" />
                            <span>Assigned: {formatDate(assignment.dateAssigned)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiCalendar className="text-white/40" />
                            <span>Due: {formatDate(assignment.dueDate)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiAward className="text-white/40" />
                            <span>{assignment.points} points</span>
                          </div>
                          {assignment.estimatedTime && (
                            <div className="flex items-center gap-2">
                              <FiClock className="text-white/40" />
                              <span>{assignment.estimatedTime}</span>
                            </div>
                          )}
                        </div>

                        {/* Teacher Remarks */}
                        {assignment.teacherRemarks && (
                          <div className="mb-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <div className="flex items-center gap-2 text-blue-300 mb-2">
                              <FiMessageSquare className="text-blue-400" />
                              <span className="font-semibold">Teacher's Remarks</span>
                            </div>
                            <p className="text-blue-200 text-sm">{assignment.teacherRemarks}</p>
                          </div>
                        )}

                        {/* Assignment Files */}
                        {assignment.assignmentFiles && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-white/80 mb-2 flex items-center gap-2">
                              <FiFileText className="text-white/60" />
                              Assignment Files:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {assignment.assignmentFiles.map((file, fileIndex) => (
                                <motion.button
                                  key={fileIndex}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => downloadAssignment(assignment)}
                                  className="flex items-center gap-2 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-colors text-sm border border-blue-500/30"
                                >
                                  <FiDownload className="text-blue-400" />
                                  {file}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Additional Work */}
                        {assignment.additionalWork && (
                          <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                            <div className="flex items-center gap-2 text-green-300 mb-2">
                              <FiTrendingUp className="text-green-400" />
                              <span className="font-semibold">Additional Work</span>
                            </div>
                            <p className="text-green-200 text-sm">{assignment.additionalWork}</p>
                          </div>
                        )}

                        {/* Feedback for Reviewed Assignments */}
                        {assignment.feedback && (
                          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                            <div className="flex items-center gap-3 text-green-300">
                              <FiCheckCircle className="text-green-400 text-lg" />
                              <div>
                                <span className="font-semibold">Reviewed on {formatDate(assignment.submittedDate)}</span>
                                {assignment.grade && (
                                  <span className="ml-3 font-bold">Grade: {assignment.grade}</span>
                                )}
                              </div>
                            </div>
                            <p className="text-green-200 text-sm mt-2">{assignment.feedback}</p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex lg:flex-col gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedAssignment(assignment)}
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 whitespace-nowrap border border-white/20"
                        >
                          <FiEye className="text-lg" />
                          View Details
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => downloadAssignment(assignment)}
                          className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors whitespace-nowrap flex items-center gap-2"
                        >
                          <FiDownload className="text-lg" />
                          Download All
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center items-center gap-4 mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                  >
                    <FiChevronLeft className="text-lg" />
                    Previous
                  </motion.button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                          currentPage === page
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {page}
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                  >
                    Next
                    <FiChevronRight className="text-lg" />
                  </motion.button>

                  <div className="text-white/60 text-sm ml-4">
                    Page {currentPage} of {totalPages}
                  </div>
                </motion.div>
              )}

              {/* Pagination Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-4 text-white/50 text-sm"
              >
                <FiChevronDown className="inline mr-2 animate-bounce" />
                Use pagination to view all {filteredAssignments.length} assignments
                <FiChevronDown className="inline ml-2 animate-bounce" />
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Full-Page Assignment Detail Modal */}
      <AnimatePresence>
        {selectedAssignment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedAssignment(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-800/95 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-slate-800/95 backdrop-blur-md border-b border-white/20 p-6 flex items-center justify-between">
                <h3 className="text-3xl font-bold text-white">{selectedAssignment.title}</h3>
                <button
                  onClick={() => setSelectedAssignment(null)}
                  className="p-3 hover:bg-white/10 rounded-2xl transition-colors"
                >
                  <FiX className="text-2xl text-white/80 hover:text-white" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Basic Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <h4 className="text-white/60 text-sm mb-2">Subject</h4>
                    <p className="text-white font-semibold text-lg">{selectedAssignment.subject}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <h4 className="text-white/60 text-sm mb-2">Class</h4>
                    <p className="text-white font-semibold text-lg">{selectedAssignment.class}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <h4 className="text-white/60 text-sm mb-2">Teacher</h4>
                    <p className="text-white font-semibold text-lg">{selectedAssignment.teacher}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <h4 className="text-white/60 text-sm mb-2">Points</h4>
                    <p className="text-white font-semibold text-lg">{selectedAssignment.points}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-2xl p-4">
                    <h4 className="text-white/60 text-sm mb-2">Date Assigned</h4>
                    <p className="text-white font-semibold">{formatDate(selectedAssignment.dateAssigned)}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4">
                    <h4 className="text-white/60 text-sm mb-2">Due Date</h4>
                    <p className="text-white font-semibold">{formatDate(selectedAssignment.dueDate)}</p>
                  </div>
                </div>

                {/* Learning Objectives */}
                {selectedAssignment.learningObjectives && (
                  <div>
                    <h4 className="text-white/60 text-lg mb-4 flex items-center gap-2">
                      <FiTarget className="text-blue-400" />
                      Learning Objectives
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedAssignment.learningObjectives.map((objective, index) => (
                        <div key={index} className="flex items-start gap-3 bg-white/5 rounded-xl p-4">
                          <FiCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-white text-sm">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-white/60 text-lg mb-4 flex items-center gap-2">
                    <FiFileText className="text-blue-400" />
                    Assignment Description
                  </h4>
                  <p className="text-white leading-relaxed text-lg bg-white/5 p-6 rounded-2xl border border-white/10">
                    {selectedAssignment.description}
                  </p>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="text-white/60 text-lg mb-4 flex items-center gap-2">
                    <FiEdit className="text-green-400" />
                    Detailed Instructions
                  </h4>
                  <p className="text-white leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">
                    {selectedAssignment.instructions}
                  </p>
                </div>

                {/* Teacher Remarks */}
                {selectedAssignment.teacherRemarks && (
                  <div>
                    <h4 className="text-white/60 text-lg mb-4 flex items-center gap-2">
                      <FiMessageSquare className="text-yellow-400" />
                      Teacher's Special Remarks
                    </h4>
                    <p className="text-yellow-200 leading-relaxed bg-yellow-500/10 p-6 rounded-2xl border border-yellow-500/20 text-lg">
                      {selectedAssignment.teacherRemarks}
                    </p>
                  </div>
                )}

                {/* Additional Work */}
                {selectedAssignment.additionalWork && (
                  <div>
                    <h4 className="text-white/60 text-lg mb-4 flex items-center gap-2">
                      <FiTrendingUp className="text-green-400" />
                      Additional Work & Extensions
                    </h4>
                    <p className="text-green-200 leading-relaxed bg-green-500/10 p-6 rounded-2xl border border-green-500/20 text-lg">
                      {selectedAssignment.additionalWork}
                    </p>
                  </div>
                )}

                {/* Assignment Files */}
                {selectedAssignment.assignmentFiles && (
                  <div>
                    <h4 className="text-white/60 text-lg mb-4 flex items-center gap-2">
                      <FiDownload className="text-purple-400" />
                      Download Assignment Files
                    </h4>
                    <div className="grid gap-3">
                      {selectedAssignment.assignmentFiles.map((file, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => downloadAssignment(selectedAssignment)}
                          className="flex items-center justify-between gap-4 px-6 py-4 bg-white/5 text-white/80 rounded-xl hover:bg-white/10 transition-colors text-base border border-white/20 w-full text-left"
                        >
                          <div className="flex items-center gap-3">
                            <FiDownload className="text-purple-400 text-lg" />
                            <span className="font-medium">{file}</span>
                          </div>
                          <span className="text-white/60 text-sm">Click to download</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feedback for Reviewed Assignments */}
                {selectedAssignment.feedback && (
                  <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
                    <h4 className="text-green-300 font-semibold text-xl mb-4 flex items-center gap-2">
                      <FiCheckCircle className="text-green-400" />
                      Teacher Feedback
                    </h4>
                    {selectedAssignment.grade && (
                      <div className="text-green-200 font-bold text-lg mb-3 p-3 bg-green-500/20 rounded-xl inline-block">
                        Grade: {selectedAssignment.grade}
                      </div>
                    )}
                    <p className="text-green-200 text-lg leading-relaxed">{selectedAssignment.feedback}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-white/20">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => downloadAssignment(selectedAssignment)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                  >
                    <FiDownload className="text-xl" />
                    Download All Files
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAssignment(null)}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-bold text-lg transition-colors flex items-center justify-center gap-3 border border-white/20"
                  >
                    <FiX className="text-xl" />
                    Close Details
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