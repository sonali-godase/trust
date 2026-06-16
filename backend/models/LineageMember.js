const mongoose = require('mongoose');

const LineageMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  era: {
    type: String,
    required: true,
    trim: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Published'],
    default: 'Draft'
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LineageMember',
    default: null
  },
  profileImage: {
    type: String,
    default: null
  },
  galleryImages: [{
    type: String
  }],
  documents: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('LineageMember', LineageMemberSchema);
