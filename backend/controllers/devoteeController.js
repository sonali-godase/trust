const Devotee = require("../models/Devotee");

exports.getAllDevotees = async (req, res) => {
  try {
    const devotees = await Devotee.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: devotees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createDevotee = async (req, res) => {
  try {
    if (!req.body.password) {
      req.body.password = "password123";
    }
    const devotee = new Devotee(req.body);
    await devotee.save();
    res.status(201).json({ success: true, data: devotee });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateDevotee = async (req, res) => {
  try {
    const devotee = await Devotee.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (!devotee) return res.status(404).json({ success: false, message: "Devotee not found" });
    res.status(200).json({ success: true, data: devotee });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteDevotee = async (req, res) => {
  try {
    const devotee = await Devotee.findByIdAndDelete(req.params.id);
    if (!devotee) return res.status(404).json({ success: false, message: "Devotee not found" });
    res.status(200).json({ success: true, message: "Devotee deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
