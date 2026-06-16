import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Search, ShieldCheck } from 'lucide-react';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const VerifyReceipt = () => {
  const { receiptNumber: paramReceiptNumber } = useParams();
  const [receiptNumber, setReceiptNumber] = useState(paramReceiptNumber || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (paramReceiptNumber) {
      verifyReceipt(paramReceiptNumber);
    }
  }, [paramReceiptNumber]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!receiptNumber.trim()) return;
    verifyReceipt(receiptNumber);
  };

  const verifyReceipt = async (receiptNo) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const response = await api.get(`/donations/verify-receipt/${receiptNo}`);
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        setError('Receipt not found or invalid.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Receipt not found or invalid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF6]">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-20 px-4 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl text-center mb-10">
          <div className="flex justify-center mb-4 text-mahakal-saffron">
            <ShieldCheck className="w-16 h-16" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-mahakal-burgundy mb-2">Verify Receipt</h1>
          <p className="text-stone-600">Enter the receipt number to verify the authenticity of a donation receipt issued by Kolekar Maha Swamiji Math.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8">
          <form onSubmit={handleSearch} className="relative flex items-center mb-8">
            <input 
              type="text" 
              value={receiptNumber} 
              onChange={(e) => setReceiptNumber(e.target.value)}
              placeholder="Enter Receipt Number (e.g. REC-12345678)"
              className="w-full pl-6 pr-32 py-4 rounded-xl border-2 border-stone-200 focus:border-mahakal-saffron focus:ring-2 focus:ring-mahakal-saffron outline-none font-mono text-lg"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-mahakal-saffron hover:bg-amber-600 text-white px-6 rounded-lg font-bold transition-colors flex items-center gap-2"
            >
              {loading ? "Checking..." : <><Search className="w-5 h-5"/> Verify</>}
            </button>
          </form>

          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50 border-2 border-red-100 rounded-xl p-6 flex flex-col items-center text-center">
              <XCircle className="w-12 h-12 text-red-500 mb-3" />
              <h3 className="text-xl font-bold text-red-800 mb-1">Receipt Not Found</h3>
              <p className="text-red-600">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-green-50 border-2 border-green-200 rounded-xl p-6 md:p-8">
              <div className="flex flex-col items-center text-center border-b border-green-200 pb-6 mb-6">
                <CheckCircle2 className="w-16 h-16 text-green-600 mb-3" />
                <h3 className="text-2xl font-bold text-green-800 mb-1">Authentic Receipt</h3>
                <p className="text-green-700">This receipt was officially issued by our system.</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-green-100">
                  <span className="text-green-700 font-medium text-sm uppercase tracking-widest">Receipt Number</span>
                  <span className="font-mono font-bold text-lg text-green-900">{result.receiptNumber}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-100">
                  <span className="text-green-700 font-medium text-sm uppercase tracking-widest">Donor Name</span>
                  <span className="font-bold text-green-900">{result.donorName}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-100">
                  <span className="text-green-700 font-medium text-sm uppercase tracking-widest">Amount</span>
                  <span className="font-bold text-2xl text-green-900">₹{result.amount}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-100">
                  <span className="text-green-700 font-medium text-sm uppercase tracking-widest">Date Issued</span>
                  <span className="font-medium text-green-900">{new Date(result.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-green-700 font-medium text-sm uppercase tracking-widest">Status</span>
                  <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold shadow-sm">VERIFIED</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VerifyReceipt;
