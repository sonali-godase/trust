import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { FaOm, FaMapMarkerAlt, FaPhoneAlt, FaChevronRight } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../utils/api";
import heroBg from "../../assets/hero_bg.jpeg";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    document.title = "Our Divine Branches | Kolekar Maharaj Sansthan";
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const res = await api.get("/branches");
      
      const fetchedBranches = res.data.branches || [];
      setBranches(fetchedBranches);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const locations = useMemo(() => {
    const locs = new Set(branches.map(b => b.location).filter(Boolean));
    return ["All", ...Array.from(locs)];
  }, [branches]);

  const filteredBranches = useMemo(() => {
    return branches.filter(branch => {
      const query = searchQuery.toLowerCase();
      const matchesSearch = branch.name.toLowerCase().includes(query) || 
                            (branch.description && branch.description.toLowerCase().includes(query)) ||
                            (branch.address && branch.address.toLowerCase().includes(query)) ||
                            (branch.location && branch.location.toLowerCase().includes(query));
      const matchesLocation = selectedLocation === "All" || branch.location === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [branches, searchQuery, selectedLocation]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans text-stone-800 selection:bg-[#FF8C00]/30 selection:text-[#4A0E0E] flex flex-col relative overflow-hidden">
      
      <Navbar />
      
      {/* Majestic Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-stone-900 flex flex-col justify-center">
        <motion.div 
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-stone-900/60 z-10"></div>
          <img src={heroBg} alt="Temple Branches Hero" className="w-full h-full object-cover object-center" />
        </motion.div>
        
        <div className="relative z-40 w-full max-w-5xl mx-auto px-6 pt-20 pb-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center w-full"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-16 h-px bg-white/30"></span>
              <FaOm className="text-white/80 text-3xl drop-shadow-md" />
              <span className="w-16 h-px bg-white/30"></span>
            </div>
            
            <h4 className="text-[#FF8C00] font-bold tracking-[0.3em] uppercase text-xs mb-4">Temple Directory</h4>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-[1.1] tracking-tight drop-shadow-lg">
              Our Divine Branches
            </h1>
            
            <p className="text-base md:text-xl text-stone-200 font-light max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-md">
              Explore our network of sacred ashrams spread across the holy land. Find your nearest sanctuary for devotion, prayers, and community welfare.
            </p>

            {/* Premium Glassmorphic Search Bar */}
            <div className="relative w-full max-w-xl mx-auto z-50">
              <form 
                onSubmit={handleSearch}
                className="relative group"
              >
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 text-lg transition-colors group-focus-within:text-[#FF8C00] z-10 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search ashrams or locations..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full pl-16 pr-6 py-4 text-white placeholder-stone-300 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all shadow-lg text-sm md:text-base"
                />
                <button type="submit" className="hidden">Search</button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advanced Directory Layout */}
      <section ref={resultsRef} className="py-16 md:py-24 bg-[#FAFAF9] relative z-10 scroll-mt-10 flex-1">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Horizontal Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16 pb-8 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-5 h-5 text-[#FF8C00]" />
              <span className="font-bold text-[#4A0E0E] uppercase tracking-widest text-sm font-serif">Filter by Region:</span>
            </div>
            
            <div className="relative w-full md:w-auto">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full md:w-64 flex items-center justify-between px-6 py-3.5 bg-white border border-stone-200 rounded-xl shadow-sm text-stone-700 font-bold hover:border-[#FF8C00] transition-colors group"
              >
                <span>{selectedLocation === "All" ? "All Branches" : selectedLocation}</span>
                <FaChevronRight className={`text-[#FF8C00] transition-transform duration-300 ${isDropdownOpen ? 'rotate-90' : 'rotate-0'}`} size={12} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setIsDropdownOpen(false)}></div>
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 w-full md:w-64 mt-2 bg-white border border-stone-200 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden z-30"
                    >
                      <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {locations.map((loc) => (
                          <button
                            key={loc}
                            onClick={() => {
                              setSelectedLocation(loc);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-6 py-3.5 text-sm font-medium transition-colors ${
                              selectedLocation === loc 
                                ? 'bg-[#4A0E0E] text-white' 
                                : 'text-stone-600 hover:bg-stone-50 hover:text-[#FF8C00]'
                            }`}
                          >
                            {loc === "All" ? "All Branches" : loc}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Directory Grid */}
          {loading ? (
            <div className="flex flex-col justify-center items-center py-32 bg-white rounded-3xl border border-stone-100 shadow-sm">
              <Loader2 className="w-12 h-12 animate-spin text-[#FF8C00] mb-6" />
              <p className="text-stone-500 font-serif italic text-xl">Loading spiritual centers...</p>
            </div>
          ) : filteredBranches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <AnimatePresence>
                    {filteredBranches.map((branch, idx) => (
                      <motion.div 
                        key={branch._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(74,14,14,0.15)] transition-all duration-500 border border-stone-100 flex flex-col"
                      >
                        {/* Image Container with Saffron accent */}
                        <div className="w-full h-64 overflow-hidden relative bg-stone-100 border-b-4 border-[#FF8C00]">
                          <img 
                            src={branch.image || "/about_images/kolekar_real_1.jpg"} 
                            alt={branch.name}
                            onError={(e) => { e.target.onerror = null; e.target.src = "/about_images/kolekar_real_1.jpg"; }}
                            className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105 filter group-hover:brightness-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent"></div>
                          
                          {/* Floating Location Badge */}
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#4A0E0E] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg flex items-center gap-2">
                            <FaMapMarkerAlt className="text-[#FF8C00]" />
                            {branch.location || "Temple Branch"}
                          </div>

                          <div className="absolute bottom-4 left-6 right-6">
                             <h2 className="text-2xl font-serif font-bold text-white drop-shadow-md leading-tight line-clamp-2">
                               {branch.name}
                             </h2>
                          </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 md:p-8 flex flex-col flex-1 relative">
                          <p className="text-stone-500 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                            {branch.description || "A serene and divine place for devotion, prayers, and community welfare. Experience the profound peace and spiritual energy."}
                          </p>

                          <div className="mt-auto flex flex-col gap-3">
                            {branch.address && (
                              <div className="flex items-start gap-3 text-stone-600 text-sm">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-stone-100 flex items-center justify-center text-[#FF8C00]">
                                  <FaMapMarkerAlt size={12} />
                                </div>
                                <span className="font-medium line-clamp-2 leading-tight mt-1.5">{branch.address}</span>
                              </div>
                            )}

                            {branch.contact && (
                              <div className="flex items-center gap-3 text-stone-600 text-sm">
                                <div className="w-8 h-8 shrink-0 rounded-full bg-stone-100 flex items-center justify-center text-[#FF8C00]">
                                  <FaPhoneAlt size={12} />
                                </div>
                                <span className="font-medium">{branch.contact}</span>
                              </div>
                            )}

                            <Link 
                              to={`/branches/${branch._id}`}
                              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#FAFAF9] border border-stone-200 text-[#4A0E0E] font-bold text-[10px] uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-[#4A0E0E] hover:text-white transition-colors duration-300 group/link"
                            >
                              Explore Branch 
                              <FaChevronRight size={10} className="group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-32 bg-white rounded-3xl border border-dashed border-stone-300 shadow-sm"
            >
              <div className="w-20 h-20 mx-auto bg-[#FF8C00]/10 rounded-full flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-[#FF8C00]" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#4A0E0E] mb-2">No Branches Found</h3>
              <p className="text-stone-500 max-w-sm mx-auto mb-6">We couldn't find any spiritual centers matching your search. Try adjusting your filters.</p>
              
              <button 
                onClick={() => { setSearchQuery(""); setSelectedLocation("All"); }}
                className="bg-[#4A0E0E] text-white font-bold px-8 py-3 rounded-full hover:bg-[#FF8C00] transition-colors uppercase tracking-widest text-xs"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Branches;
