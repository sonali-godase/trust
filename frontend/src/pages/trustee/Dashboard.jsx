import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRupeeSign, FaSpinner, FaBuilding, FaFileAlt, FaUsers, FaCalendarAlt, FaBullhorn, FaUserShield, FaHandHoldingHeart } from 'react-icons/fa';
import api from "../../utils/api";

const StatCard = ({ title, value, icon, colorClass, delay }) => (
  <div 
    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group"
  >
    <div className="flex items-center justify-between mb-6 relative z-10">
      <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</h3>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClass} text-xl transform group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
    </div>
    <p className="text-4xl font-black text-gray-900 relative z-10">{value}</p>
  </div>
);

const TrusteeDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/trustees/stats').then(res => {
      setStats(res.data.stats);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading) return <div className="h-full flex items-center justify-center py-20"><FaSpinner className="text-5xl text-saffron-500 animate-spin" /></div>;

  return (
    <div className="space-y-6 md:space-y-8 p-4 sm:p-6 lg:p-8 pb-12 w-full bg-transparent text-gray-900 font-sans w-full">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <FaUserShield className="text-gray-700" /> Trustee Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-2">Overview of trust activities and performance.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Devotees" value={stats.totalDevotees?.toString() || '0'} icon={<FaUsers />} colorClass="bg-blue-50 text-blue-500" delay={0.1} />
        <StatCard title="Total Donations" value={`₹ ${stats.totalDonations?.toLocaleString() || '0'}`} icon={<FaRupeeSign />} colorClass="bg-green-50 text-green-500" delay={0.2} />
        <StatCard title="Total Events" value={stats.totalEvents?.toString() || '0'} icon={<FaCalendarAlt />} colorClass="bg-purple-50 text-purple-500" delay={0.3} />
        <StatCard title="Total Announcements" value={stats.totalAnnouncements?.toString() || '0'} icon={<FaBullhorn />} colorClass="bg-yellow-50 text-yellow-500" delay={0.4} />
        <StatCard title="Total Branches" value={stats.totalBranches?.toString() || '0'} icon={<FaBuilding />} colorClass="bg-indigo-50 text-indigo-500" delay={0.5} />
        <StatCard title="Total Documents" value={stats.totalDocuments?.toString() || '0'} icon={<FaFileAlt />} colorClass="bg-gray-100 text-gray-500" delay={0.6} />
        <StatCard title="Trust Members" value={stats.totalTrustMembers?.toString() || '0'} icon={<FaUserShield />} colorClass="bg-red-50 text-red-500" delay={0.7} />
        <StatCard title="Annadan Records" value={stats.totalAnnadanRecords?.toString() || '0'} icon={<FaHandHoldingHeart />} colorClass="bg-pink-50 text-pink-500" delay={0.8} />
      </div>
    </div>
  );
};

export default TrusteeDashboard;
