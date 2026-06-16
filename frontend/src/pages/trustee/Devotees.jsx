import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaTimes, FaSpinner, FaUsers, FaArrowUp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import api from "../../utils/api";
import { usePermissions } from '../../hooks/usePermissions';

const Devotees = () => {
  const [devotees, setDevotees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', address: '' });
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [filterLocation, setFilterLocation] = useState("");
  const { hasManage } = usePermissions('Devotees');

  useEffect(() => {
    fetchDevotees();
  }, []);

  const fetchDevotees = async () => {
    try {
      setLoading(true);
      const res = await api.get('/devotees');
      setDevotees(res.data.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch devotees.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (devotee = null) => {
    if (devotee) {
      setEditingId(devotee._id);
      setFormData({ name: devotee.name, email: devotee.email || '', mobile: devotee.mobile, address: devotee.address || '' });
    } else {
      setEditingId(null);
      setFormData({ name: '', email: '', mobile: '', address: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (editingId) {
        await api.put(`/devotees/${editingId}`, formData);
      } else {
        await api.post('/devotees', formData);
      }
      setIsModalOpen(false);
      fetchDevotees();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save devotee.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to remove this devotee from the registry?")) {
      try {
        await api.delete(`/devotees/${id}`);
        fetchDevotees();
      } catch (err) {
        setError("Failed to delete devotee.");
      }
    }
  };

  const filtered = devotees.filter(d => 
    (d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.mobile.includes(searchTerm)) &&
    (filterLocation ? d.address?.toLowerCase().includes(filterLocation.toLowerCase()) : true)
  );

  const uniqueLocations = [...new Set(devotees.map(d => d.address?.trim()).filter(Boolean))];

  const getGradient = (name) => {
    const defaultGradients = [
      'from-blue-400 to-indigo-500', 
      'from-emerald-400 to-teal-500', 
      'from-saffron-400 to-orange-500', 
      'from-purple-400 to-pink-500',
      'from-rose-400 to-red-500'
    ];
    let sum = 0;
    for(let i=0; i<name.length; i++) sum += name.charCodeAt(i);
    return defaultGradients[sum % defaultGradients.length];
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-6">

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all duration-300"
        >
          <div>
            <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Devotees</p>
            <h3 className="text-4xl font-bold text-deepblue-900">{devotees.length}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-saffron-50 flex items-center justify-center text-saffron-500 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
            <FaUsers className="text-3xl" />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-deepblue-900 to-deepblue-800 p-6 rounded-3xl shadow-lg border border-gray-800 flex items-center justify-between relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <p className="text-blue-300 text-sm font-semibold uppercase tracking-wider mb-2">New This Week</p>
            <div className="flex items-center gap-3">
              <h3 className="text-4xl font-bold text-white">42</h3>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                <FaArrowUp /> 12%
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Table Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-saffron-50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

        <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
          <div>
            <h2 className="text-2xl font-bold text-deepblue-900">Devotee Directory
              {!hasManage && <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm ml-4 font-sans inline-block align-middle">View Only Access</span>}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Manage, search, and update records securely.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by name or mobile..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-saffron-500 outline-none transition-all shadow-sm text-gray-700"
              />
            </div>
            
            <div className="relative w-full sm:w-48">
              <select 
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-saffron-500 outline-none transition-all shadow-sm text-gray-700 cursor-pointer"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
            
            {hasManage && (
              <button 
                onClick={() => handleOpenModal()} 
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-black shadow-lg shadow-gray-900/30 transition-all hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
              >
                <FaPlus /> Add Devotee
              </button>
            )}
          </div>
        </div>

        {error && <div className="bg-red-50 text-red-600 font-medium p-4 mx-8 mt-4 rounded-xl text-sm border border-red-100 flex items-center justify-between"><span>{error}</span><FaTimes className="cursor-pointer" onClick={() => setError('')} /></div>}

        <div className="flex-1 overflow-auto relative z-10 p-4">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
              <div className="w-16 h-16 border-4 border-gray-100 border-t-saffron-500 rounded-full animate-spin"></div>
              <p className="font-medium animate-pulse">Loading devotees...</p>
            </div>
          ) : (
            <div className="w-full bg-transparent min-w-[800px]">
              <div className="grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-widest px-8 py-4 sticky top-0 bg-white/90 backdrop-blur-md z-20 border-b border-gray-100">
                <div className="col-span-4">Devotee Profile</div>
                <div className="col-span-3">Contact Info</div>
                <div className="col-span-3">Location</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              
              <div className="flex flex-col gap-2 p-4">
                <AnimatePresence>
                  {filtered.map((devotee, idx) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      className="grid grid-cols-12 items-center px-4 py-4 bg-white hover:bg-gray-50/80 rounded-2xl border border-gray-100 hover:border-saffron-200 transition-all group shadow-sm hover:shadow-md"
                      key={devotee._id || idx}
                    >
                      <div className="col-span-4 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getGradient(devotee.name)} flex items-center justify-center font-bold text-white text-lg shadow-inner`}>
                          {devotee.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-base">{devotee.name}</p>
                          <p className="text-xs text-gray-400 font-medium">Joined {new Date(devotee.registrationDate || Date.now()).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="col-span-3 flex flex-col gap-1">
                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-2"><FaPhoneAlt className="text-gray-400 text-[10px]" /> {devotee.mobile}</p>
                        {devotee.email && <p className="text-xs text-gray-500 flex items-center gap-2"><FaEnvelope className="text-gray-400 text-[10px]" /> {devotee.email}</p>}
                      </div>
                      
                      <div className="col-span-3">
                        <p className="text-sm text-gray-600 flex items-start gap-2 bg-gray-50 px-3 py-1.5 rounded-lg w-max max-w-[90%] truncate">
                          <FaMapMarkerAlt className="text-saffron-500 mt-1 shrink-0" /> {devotee.address || 'Location Not Provided'}
                        </p>
                      </div>
                      
                      <div className="col-span-2 flex items-center justify-end gap-2 pr-2">
                        {hasManage ? (
                          <>
                            <button 
                              onClick={() => handleOpenModal(devotee)} 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors tooltip-trigger relative"
                            >
                              <FaEdit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(devotee._id)} 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                              <FaTrash size={16} />
                            </button>
                          </>
                        ) : (
                          <div className="text-xs text-gray-400 font-bold">View Only</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {filtered.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <FaSearch className="text-6xl mb-4 opacity-20" />
                    <p className="text-lg font-medium">No devotees found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Premium Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-deepblue-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden relative"
            >
              {/* Modal Header Decorative Element */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-saffron-400 via-orange-500 to-red-500"></div>
              
              <div className="px-8 pt-8 pb-4 flex justify-between items-center bg-white">
                <div>
                  <h3 className="text-2xl font-black text-deepblue-900 tracking-tight">{editingId ? 'Update Devotee' : 'Register Devotee'}</h3>
                  <p className="text-gray-500 text-sm mt-1">{editingId ? 'Modify existing records securely.' : 'Add a new member to the trust.'}</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <FaTimes size={18} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 pt-2 space-y-5">
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-saffron-500 transition-colors">Full Name <span className="text-red-500">*</span></label>
                  <input required type="text" placeholder="e.g. Rahul Sharma" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-saffron-500/50 focus:border-saffron-500 transition-all font-medium text-gray-800 placeholder-gray-400" />
                </div>
                
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-saffron-500 transition-colors">Mobile Number <span className="text-red-500">*</span></label>
                  <input required type="tel" placeholder="+91 9876543210" value={formData.mobile} onChange={(e)=>setFormData({...formData, mobile: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-saffron-500/50 focus:border-saffron-500 transition-all font-medium text-gray-800 placeholder-gray-400" />
                </div>
                
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-saffron-500 transition-colors">Email Address</label>
                  <input type="email" placeholder="devotee@example.com" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-saffron-500/50 focus:border-saffron-500 transition-all font-medium text-gray-800 placeholder-gray-400" />
                </div>
                
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-saffron-500 transition-colors">Address</label>
                  <textarea placeholder="Enter complete address..." value={formData.address} onChange={(e)=>setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-saffron-500/50 focus:border-saffron-500 transition-all font-medium text-gray-800 placeholder-gray-400 resize-none h-24" />
                </div>
                
                <div className="pt-4 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="w-1/3 py-3.5 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={submitting} 
                    type="submit" 
                    className="w-2/3 flex justify-center items-center gap-2 py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-black rounded-xl hover:bg-blue-900 hover:bg-blue-800 transition-all shadow-lg shadow-gray-900/30 hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {submitting ? <FaSpinner className="animate-spin text-xl" /> : (editingId ? 'Save Changes' : 'Complete Registration')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Devotees;
