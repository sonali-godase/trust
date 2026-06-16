const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  priority: { type: String, enum: ['Normal', 'Important', 'Urgent'], default: 'Normal' },
  status: { type: String, enum: ['Draft', 'Scheduled', 'Published', 'Expired'], default: 'Published' },
  audienceType: [{ 
    type: String, 
    enum: [
      'All Users', 'All Devotees', 'All Trust Members', 'All Branches', 
      'Specific Branches', 'Specific Roles', 'Specific Users', 'Selected Users', 'Specific Trust Members'
    ]
  }],
  
  // Targeting
  targetBranches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
  targetRoles: [{ type: String }],
  targetUsers: [{ type: mongoose.Schema.Types.ObjectId }], // Polymorphic user IDs
  targetTrustees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trustee' }], // Kept for legacy support if needed

  displayLocations: [{ type: String }],
  
  publishDate: { type: Date, default: Date.now },
  expiryDate: { type: Date },
  
  // Integrations
  whatsappIntegration: { type: Boolean, default: false },
  smsIntegration: { type: Boolean, default: false },
  emailIntegration: { type: Boolean, default: false },
  dashboardNotification: { type: Boolean, default: true },
  
  // Authorship
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: false }, // Could be required if we want strict authorship
  createdByModel: { type: String, enum: ['Admin', 'Trustee', 'BranchManager'], required: false }
}, { timestamps: true });

module.exports = mongoose.model("Announcement", announcementSchema);
