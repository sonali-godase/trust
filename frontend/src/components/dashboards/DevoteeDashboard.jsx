import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Heart, Calendar, FileText } from 'lucide-react';

const DevoteeDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 pb-12">
      <h1 className="text-3xl font-black text-deepblue-900 mb-2">Welcome, {user?.name}</h1>
      <p className="text-gray-500 mb-8">May the blessings of Kolekar Maha Swamiji always be with you.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
            <Heart size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">My Donations</h3>
            <p className="text-sm text-gray-500">View receipts</p>
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-saffron-50 text-saffron-500 rounded-full flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Pooja Bookings</h3>
            <p className="text-sm text-gray-500">Manage bookings</p>
          </div>
        </motion.div>
        <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all">
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">My Profile</h3>
            <p className="text-sm text-gray-500">Update details</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DevoteeDashboard;
