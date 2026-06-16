const mongoose = require("mongoose");

const bulletinSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
  },
  messages: {
    type: [String],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trustee",
  }
}, { timestamps: true });

module.exports = mongoose.model("Bulletin", bulletinSchema);
