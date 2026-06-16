const Donation = require('../models/Donation');
const Devotee = require('../models/Devotee');
const Event = require('../models/Event');
const Annadaan = require('../models/Annadaan');

exports.getPublicStats = async (req, res) => {
  try {
    // 1. Total unique donors count
    const uniqueDonors = await Donation.distinct('email');
    const totalDonation = uniqueDonors.length;

    // 2. Registered devotees count
    const totalDevotees = await Devotee.countDocuments();

    // 3. Events count
    const totalEvents = await Event.countDocuments();

    // 4. Annadan entries count
    const totalAnnadan = await Annadaan.countDocuments();

    res.json({
      success: true,
      stats: {
        totalDonation,
        totalDevotees,
        totalEvents,
        totalAnnadan
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
