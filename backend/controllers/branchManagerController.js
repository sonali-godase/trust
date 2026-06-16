const Donation = require("../models/Donation");
const Event = require("../models/Event");
const Document = require("../models/Document");

exports.getStats = async (req, res) => {
  try {
    const branchId = req.user.branch;

    const totalEvents = await Event.countDocuments({ branch: branchId });
    const pendingDocuments = await Document.countDocuments({ branch: branchId, status: "Pending" });
    
    const donations = await Donation.aggregate([
      { $match: { branchId: branchId, status: 'APPROVED' } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalDonations = donations.length > 0 ? donations[0].total : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalEvents,
        pendingDocuments,
        totalDonations
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBranchDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ branchId: req.user.branch }).sort("-createdAt");
    res.status(200).json({ success: true, data: donations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBranchEvents = async (req, res) => {
  try {
    const events = await Event.find({ branch: req.user.branch }).sort("-eventDate");
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBranchDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ branch: req.user.branch }).populate("branch", "name").sort("-createdAt");
    res.status(200).json({ success: true, data: documents });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
