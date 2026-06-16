import React from 'react';
import { Download, Printer, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Receipt = ({ donationDetails, onDownload, onPrint }) => {
  if (!donationDetails) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-caramel-deep">Donation Successful</h2>
        <p className="text-caramel-dark mt-2">Thank you for your generous contribution.</p>
      </div>

      <div className="border-t border-b border-gray-200 py-4 my-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-caramel-dark">Transaction ID</span>
          <span className="font-semibold text-caramel-deep text-right max-w-[200px] truncate">{donationDetails.paymentId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-caramel-dark">Date</span>
          <span className="font-semibold text-caramel-deep">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-caramel-dark">Name</span>
          <span className="font-semibold text-caramel-deep">{donationDetails.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-caramel-dark">Amount</span>
          <span className="font-semibold text-green-600 text-lg">₹{donationDetails.amount}</span>
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-caramel-dark italic">
        "May the divine blessings be always with you and your family."
      </div>

      <div className="mt-8 flex gap-4">
        <button 
          onClick={onPrint}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-cream to-caramel/10 text-caramel-deep px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Printer size={18} />
          Print
        </button>
        <button 
          onClick={onDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-orange-600 text-caramel-deep px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Download size={18} />
          Download
        </button>
      </div>
    </motion.div>
  );
};

export default Receipt;
