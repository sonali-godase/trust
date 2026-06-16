import re

file_path = r"c:\Users\vrush\Sponsered_project_Main\trust_management_system\frontend\src\pages\user\Home.jsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update StatCounter
stat_counter_old = re.search(r"const StatCounter = .*?;\n};\n", content, re.DOTALL)
stat_counter_new = """const StatCounter = ({ end, label, duration = 2.5, textColor = "text-[#4A0E0E]", labelColor = "text-stone-500" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center p-6 relative group"
    >
      <motion.span 
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className={`text-5xl md:text-6xl font-black ${textColor} mb-3 font-serif relative z-10 drop-shadow-sm`}
      >
        <CountUp end={end} duration={duration} enableScrollSpy scrollSpyOnce />+
      </motion.span>
      <span className={`font-black tracking-[0.2em] uppercase text-xs md:text-sm ${labelColor} relative z-10`}>{label}</span>
      <div className="w-12 h-1 bg-[#FF8C00]/50 mt-4 relative z-10 group-hover:w-24 group-hover:bg-[#FF8C00] transition-all duration-500 rounded-full"></div>
    </motion.div>
  );
};
"""
if stat_counter_old:
    content = content.replace(stat_counter_old.group(0), stat_counter_new)

# 2. Add Floating Quick Actions Bar at the end of Hero section
hero_end_marker = """              </AnimatePresence>
            </div>
          </motion.div>
        </div>"""

floating_bar = """              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Floating Quick Actions Bar - Elevated to sit perfectly in Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-50 w-[95%] md:w-full max-w-4xl mx-auto transform translate-y-1/2 mb-[-60px]"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-3 md:p-5 flex flex-row items-center justify-between gap-2 md:gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-x-auto hide-scrollbar">
            
            <Link to="/events" className="flex-1 min-w-[140px] flex items-center justify-center gap-4 group p-2 md:p-4 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-full border border-white/20 group-hover:border-[#FF8C00] transition-colors shadow-inner">
                {isLive && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                )}
                {isLive && (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-stone-900"></span>
                )}
                <FaVideo className={`text-xl ${isLive ? "text-red-400" : "text-[#FF8C00]"}`} />
              </div>
              <div className="text-left">
                <h4 className="text-white font-bold text-[11px] md:text-base tracking-wide uppercase group-hover:text-[#FF8C00] transition-colors">{isLive ? "Live Darshan" : "Daily Darshan"}</h4>
                <p className="text-stone-300 text-[10px] md:text-xs font-light">{isLive ? "Join Aarti" : "Timings"}</p>
              </div>
            </Link>

            <div className="w-px h-12 md:h-16 bg-white/20"></div>

            <Link to="/donate" className="flex-1 min-w-[140px] flex items-center justify-center gap-4 group p-2 md:p-4 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-full border border-white/20 group-hover:border-[#FF8C00] transition-colors shadow-inner">
                <FaPrayingHands className="text-xl text-[#FF8C00]" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-bold text-[11px] md:text-base tracking-wide uppercase group-hover:text-[#FF8C00] transition-colors">Make Offering</h4>
                <p className="text-stone-300 text-[10px] md:text-xs font-light">Support Us</p>
              </div>
            </Link>

            <div className="w-px h-12 md:h-16 bg-white/20"></div>

            <Link to="/annadaan" className="flex-1 min-w-[140px] flex items-center justify-center gap-4 group p-2 md:p-4 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-full border border-white/20 group-hover:border-[#FF8C00] transition-colors shadow-inner">
                <FaHands className="text-xl text-[#FF8C00]" />
              </div>
              <div className="text-left">
                <h4 className="text-white font-bold text-[11px] md:text-base tracking-wide uppercase group-hover:text-[#FF8C00] transition-colors">Book Annadaan</h4>
                <p className="text-stone-300 text-[10px] md:text-xs font-light">Sponsor Meals</p>
              </div>
            </Link>

          </div>
        </motion.div>"""
content = content.replace(hero_end_marker, floating_bar)

# 3. Remove the old Quick Actions Grid
grid_start = "{/* Quick Actions Grid - Ultra Premium Glassmorphism */}"
grid_end = "{/* Cinematic Premium Quote Section */}"
start_idx = content.find(grid_start)
end_idx = content.find(grid_end)
if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + content[end_idx:]

# Adjust pt for Cinematic Premium Quote Section since it lost the margin
content = content.replace(
    """{/* Cinematic Premium Quote Section */}
        <div className="relative w-[95%] max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#4A0E0E] to-[#2D0808] overflow-hidden shadow-[0_40px_100px_rgba(74,14,14,0.4)] border border-[#D4AF37]/20">""",
    """{/* Cinematic Premium Quote Section */}
        <div className="relative w-[95%] max-w-7xl mx-auto mt-24 rounded-[3rem] bg-gradient-to-br from-[#4A0E0E] to-[#2D0808] overflow-hidden shadow-[0_40px_100px_rgba(74,14,14,0.4)] border border-[#D4AF37]/20">"""
)

# 4. Redesign Analytics Block
analytics_start = "{/* Analytics seamlessly blended */}"
analytics_end_regex = re.compile(r"\{\/\* Analytics seamlessly blended \*\/}.*?<\/div>\n        <\/div>", re.DOTALL)

new_analytics = """{/* Analytics seamlessly blended */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 mt-12 mb-20">
          <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-stone-100 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#FF8C00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-stone-100 relative z-10">
               <StatCounter end={stats.totalDonation || 0} label="Unique Donors" duration={2.5} textColor="text-[#FF8C00]" labelColor="text-stone-800" />
               <StatCounter end={stats.totalDevotees || 0} label="Registered Devotees" duration={2} textColor="text-[#FF8C00]" labelColor="text-stone-800" />
               <StatCounter end={stats.totalEvents || 0} label="Events Conducted" duration={2} textColor="text-[#FF8C00]" labelColor="text-stone-800" />
               <StatCounter end={stats.totalAnnadan || 0} label="Annadan Entries" duration={1.5} textColor="text-[#FF8C00]" labelColor="text-stone-800" />
            </div>
          </div>
        </div>"""

content = re.sub(analytics_end_regex, new_analytics, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated successfully.")
