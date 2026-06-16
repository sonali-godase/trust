const mongoose = require('mongoose');

const MathHistorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  era: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Origin', 'Philosophy', 'Miracles', 'Social Work', 'Architecture', 'Other'],
    default: 'Origin'
  },
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Published'],
    default: 'Draft'
  },
  order: {
    type: Number,
    default: 0
  },
  media: [{
    url: String,
    type: { type: String, enum: ['image', 'video', 'document'] }
  }]
}, { timestamps: true });

module.exports = mongoose.model('MathHistory', MathHistorySchema);
