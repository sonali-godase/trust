import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVideo, FaMapMarkerAlt, FaCircle, FaChevronDown } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import api from '../../utils/api';

const LiveAarti = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await api.get('/branches');
        const fetchedBranches = res.data.branches || [];
        setBranches(fetchedBranches);
        if (fetchedBranches.length > 0) {
          setSelectedBranch(fetchedBranches[0]);
        }
      } catch (error) {
        console.error('Failed to fetch branches', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();

    // Update CCTV timestamp every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCCTVTime = (date) => {
    return date.toISOString().replace('T', ' ').substring(0, 19);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF6] font-sans text-stone-800 flex flex-col pt-32">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-24 flex-1 w-full relative z-20">
        
        {/* Realistic Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">Live Aarti Darshan</h1>
          <p className="text-stone-500 font-medium">Join the daily ceremonies across our spiritual centers from anywhere in the world.</p>
        </div>

        {/* Media Player Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
          
          {/* Video Feed */}
          <div className="w-full bg-black relative aspect-video">
            {selectedBranch ? (
              <>
                {/* Live Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <div className="bg-red-600/90 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded font-bold tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    LIVE
                  </div>
                </div>

                {selectedBranch.cctvUrl ? (
                  <iframe 
                    src={selectedBranch.cctvUrl} 
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    allow="autoplay; encrypted-media"
                  />
                ) : (
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://www.w3schools.com/html/mov_bbb.mp4" // Placeholder video
                  />
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-500">
                <FaVideo className="text-5xl mb-4 text-stone-700" />
                <p className="font-medium text-lg text-stone-400">Select a temple to begin Darshan</p>
              </div>
            )}
          </div>

          {/* Info and Control Area */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-white">
            
            {/* Title & Metadata */}
            {selectedBranch ? (
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider border border-red-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Broadcasting
                  </span>
                  <span className="text-stone-400 font-mono text-sm">{formatCCTVTime(currentTime)}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 leading-tight mb-1">{selectedBranch.name}</h2>
                <p className="text-stone-500 font-medium flex items-center gap-2">
                  <FaMapMarkerAlt className="text-amber-500" />
                  {selectedBranch.location}
                </p>
              </div>
            ) : (
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold text-stone-300">No Location Selected</h2>
              </div>
            )}

            {/* Branch Selector (Grounded Listbox) */}
            <div className="w-full md:w-80 flex-shrink-0">
              <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 ml-1">Switch Location</label>
              <div className="relative">
                <button 
                  onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                  className="w-full bg-stone-50 border border-stone-200 py-3.5 px-4 rounded-xl flex justify-between items-center hover:bg-stone-100 hover:border-stone-300 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                >
                  <span className="font-bold text-stone-700 truncate pr-4">
                    {selectedBranch ? selectedBranch.name : "Select a temple"}
                  </span>
                  <FaChevronDown className={`text-stone-400 transition-transform duration-200 ${isBranchDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isBranchDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden z-50 max-h-[300px] overflow-y-auto custom-scrollbar"
                    >
                      {loading ? (
                        <div className="flex justify-center p-6">
                          <div className="animate-spin h-5 w-5 border-2 border-amber-500 rounded-full border-t-transparent"></div>
                        </div>
                      ) : branches.length > 0 ? (
                        <div className="flex flex-col">
                          {branches.map(branch => (
                            <button
                              key={branch._id}
                              onClick={() => { setSelectedBranch(branch); setIsBranchDropdownOpen(false); }}
                              className={`w-full text-left px-4 py-3 transition-colors flex items-center justify-between border-b border-stone-50 last:border-0
                                ${selectedBranch?._id === branch._id 
                                  ? 'bg-amber-50 text-amber-900 font-bold' 
                                  : 'text-stone-600 hover:bg-stone-50'}
                              `}
                            >
                              <div className="flex flex-col truncate pr-2">
                                <span className={`text-sm truncate ${selectedBranch?._id === branch._id ? 'text-amber-900 font-bold' : 'text-stone-700 font-medium'}`}>{branch.name}</span>
                                <span className="text-[11px] text-stone-400 truncate">{branch.location}</span>
                              </div>
                              {selectedBranch?._id === branch._id && (
                                <FaVideo className="text-amber-500 text-xs flex-shrink-0" />
                              )}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-sm text-stone-500">No temples available</div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LiveAarti;
