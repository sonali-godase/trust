const mongoose = require('mongoose');

const liveStreamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  streamUrl: {
    type: String,
    trim: true
  },
  videoFile: {
    type: String,
    trim: true
  },
  thumbnail: {
    type: String,
    trim: true
  },
  isLive: {
    type: Boolean,
    default: false
  },
  isPastVideo: {
    type: Boolean,
    default: false
  },
  scheduledAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LiveStream', liveStreamSchema);
