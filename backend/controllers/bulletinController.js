const Bulletin = require("../models/Bulletin");

exports.createBulletin = async (req, res) => {
  try {
    const { headline, messages, isActive } = req.body;
    const newBulletin = new Bulletin({
      headline,
      messages,
      isActive,
      createdBy: req.user._id
    });
    await newBulletin.save();
    res.status(201).json({ success: true, bulletin: newBulletin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBulletins = async (req, res) => {
  try {
    const { activeOnly } = req.query;
    let query = {};
    if (activeOnly === 'true') {
      query.isActive = true;
    }
    const bulletins = await Bulletin.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, bulletins });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBulletin = async (req, res) => {
  try {
    const { id } = req.params;
    const { headline, messages, isActive } = req.body;
    const updatedBulletin = await Bulletin.findByIdAndUpdate(
      id,
      { headline, messages, isActive },
      { returnDocument: 'after', runValidators: true }
    );
    if (!updatedBulletin) {
      return res.status(404).json({ success: false, message: "Bulletin not found" });
    }
    res.status(200).json({ success: true, bulletin: updatedBulletin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBulletin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBulletin = await Bulletin.findByIdAndDelete(id);
    if (!deletedBulletin) {
      return res.status(404).json({ success: false, message: "Bulletin not found" });
    }
    res.status(200).json({ success: true, message: "Bulletin deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
