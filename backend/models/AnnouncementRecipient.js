const mongoose = require("mongoose");

const announcementRecipientSchema = new mongoose.Schema({
  announcementId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Announcement',
    required: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true
  },
  deliveryStatus: {
    type: String,
    enum: ['Pending', 'Delivered', 'Failed'],
    default: 'Pending'
  },
  readStatus: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: Date
  },
  isDismissed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Prevent duplicate recipient records for the same announcement
announcementRecipientSchema.index({ announcementId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("AnnouncementRecipient", announcementRecipientSchema);
