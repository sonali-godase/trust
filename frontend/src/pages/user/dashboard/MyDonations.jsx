import React, { useEffect, useState } from 'react';
import { getMyDonations, downloadDonationReceipt } from '../../../services/userDashboardService';
import { TableSkeleton } from '../../../components/dashboard/LoadingSkeleton';
import EmptyState from '../../../components/dashboard/EmptyState';
import StatusBadge from '../../../components/dashboard/StatusBadge';
import { FaDonate, FaDownload, FaCalendarAlt, FaReceipt, FaCoins, FaInfoCircle } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

export const MyDonations = () => {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [downloadingId, setDownloadingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await getMyDonations({ page: 1, limit: 100 });
      if (res.data?.success) {
        setDonations(res.data.data);
        setTotalAmount(res.data.totalAmount || 0);
      }
    } catch (err) {
      console.error("Failed to load donations:", err);
      toast.error("Failed to load donation history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const approvedDonations = donations.filter(d => d.status === 'APPROVED');
  const pendingDonations = donations.filter(d => d.status === 'PENDING_VERIFICATION');
  const rejectedDonations = donations.filter(d => d.status === 'REJECTED');
  const totalApprovedAmount = approvedDonations.reduce((sum, d) => sum + d.amount, 0);

  const renderDonationRow = (d) => (
    <tr key={d._id} className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500">
        {d.donationReference || d._id.substring(0,8)}
      </td>
      <td className="px-6 py-4 text-base font-bold text-slate-900">
        ₹{d.amount.toLocaleString('en-IN')}
      </td>
      <td className="px-6 py-4 font-black text-slate-700">
        {d.purpose || 'General'}
      </td>
      <td className="px-6 py-4">
        <StatusBadge status={d?.status || 'Completed'} />
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-0.5 text-xs text-slate-600">
          <span className="font-black">{d.paymentApp || d.paymentMethod || 'Manual'}</span>
          <span className="flex items-center gap-1 text-[11px] font-black opacity-75">
            <FaCalendarAlt size={10} />
            {new Date(d.date || d.createdAt).toLocaleDateString('en-IN')}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        {d.status === 'APPROVED' ? (
          <button
            onClick={() => handleDownloadReceipt(d._id)}
            disabled={downloadingId === d._id}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-black text-white hover:text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all disabled:opacity-50 disabled:cursor-wait"
          >
            <FaDownload size={11} className={downloadingId === d._id ? 'animate-bounce' : ''} />
            <span>{downloadingId === d._id ? 'Downloading...' : 'Receipt'}</span>
          </button>
        ) : d.status === 'REJECTED' ? (
          <div className="text-xs font-bold text-red-600 max-w-[150px] mx-auto break-words" title={d.rejectionReason}>
            Reason: {d.rejectionReason || 'Contact support'}
          </div>
        ) : (
          <span className="text-xs font-medium text-stone-400">N/A</span>
        )}
      </td>
    </tr>
  );

  const handleDownloadReceipt = async (id) => {
    try {
      setDownloadingId(id);
      const res = await downloadDonationReceipt(id);
      
      // Create local Blob representing the PDF file
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Receipt downloaded successfully!");
    } catch (err) {
      console.error("Receipt download error:", err);
      toast.error("Failed to download receipt.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />

      {/* Summary Header Card */}
      {!loading && donations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-600 p-6 md:p-8 rounded-xl text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-white text-3xl">
              <FaCoins />
            </div>
            <div>
              <p className="text-white/80 text-xs font-black uppercase tracking-wider">Total Approved Contribution</p>
              <h2 className="text-4xl font-black mt-1">₹{totalApprovedAmount.toLocaleString('en-IN')}</h2>
            </div>
          </div>
          <div className="text-xs bg-blue-700 px-4 py-2.5 rounded-xl border border-blue-500 max-w-sm">
            <p className="font-black text-white/90">
              "Your offerings support our sacred ashram maintenance, daily prasad distribution, and social service projects."
            </p>
          </div>
        </motion.div>
      )}

      {loading ? (
        <TableSkeleton cols={5} rows={5} />
      ) : (
        <div className="space-y-8">
          
          {/* Approved Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-slate-900 font-black flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-black">✓</div>
                Approved Donations
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-700">
                    <th className="px-6 py-4">Reference ID</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Purpose</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Method / Date</th>
                    <th className="px-6 py-4 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {approvedDonations.length > 0 ? (
                    approvedDonations.map(renderDonationRow)
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-slate-500 font-bold">
                        No approved donations yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-slate-900 font-black flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600"><FaInfoCircle size={12}/></div>
                Pending Verification
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-700">
                    <th className="px-6 py-4">Reference ID</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Purpose</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Method / Date</th>
                    <th className="px-6 py-4 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {pendingDonations.length > 0 ? (
                    pendingDonations.map(renderDonationRow)
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-slate-500 font-bold">
                        No pending donations.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rejected Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-slate-900 font-black flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-black">✕</div>
                Rejected Transactions
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-xs font-black uppercase tracking-wider text-slate-700">
                    <th className="px-6 py-4">Reference ID</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Purpose</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Method / Date</th>
                    <th className="px-6 py-4 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {rejectedDonations.length > 0 ? (
                    rejectedDonations.map(renderDonationRow)
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-slate-500 font-bold">
                        No rejected transactions.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );

};

export default MyDonations;
