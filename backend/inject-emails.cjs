const fs = require('fs');

let code = fs.readFileSync('e:/trust_management_system/backend/controllers/announcementController.js', 'utf8');

const imports = `const Admin = require('../models/Admin');
const Trustee = require('../models/Trustee');
const BranchManager = require('../models/BranchManager');
const Accountant = require('../models/Accountant');
const User = require('../models/User');
const { sendAnnouncementEmail } = require('../services/mailService');
`;

if (!code.includes('require("../models/Admin")') && !code.includes("require('../models/Admin')")) {
  code = code.replace('const AnnouncementRecipient = require("../models/AnnouncementRecipient");', 'const AnnouncementRecipient = require("../models/AnnouncementRecipient");\n' + imports);
}

const asyncLogic = `
    // Integration logic
    if (announcement.emailIntegration) {
      (async () => {
        try {
          const emails = new Set();
          const addEmails = (docs) => {
            docs.forEach(doc => { if (doc.email) emails.add(doc.email); });
          };

          const { audienceType = [], targetBranches = [], targetRoles = [], targetUsers = [] } = announcement;
          
          if (audienceType.includes('All Users')) {
            addEmails(await User.find({ email: { $exists: true, $ne: '' } }));
            addEmails(await Trustee.find({ email: { $exists: true, $ne: '' } }));
            addEmails(await BranchManager.find({ email: { $exists: true, $ne: '' } }));
            addEmails(await Accountant.find({ email: { $exists: true, $ne: '' } }));
            addEmails(await Admin.find({ email: { $exists: true, $ne: '' } }));
          } else {
            if (audienceType.includes('All Devotees')) addEmails(await User.find({ email: { $exists: true, $ne: '' } }));
            if (audienceType.includes('All Trust Members')) addEmails(await Trustee.find({ email: { $exists: true, $ne: '' } }));
            if (audienceType.includes('All Branches')) addEmails(await BranchManager.find({ email: { $exists: true, $ne: '' } }));
            if (targetBranches && targetBranches.length > 0) addEmails(await BranchManager.find({ branchId: { $in: targetBranches }, email: { $exists: true, $ne: '' } }));
            if (targetRoles && targetRoles.length > 0) {
              addEmails(await Trustee.find({ systemRole: { $in: targetRoles }, email: { $exists: true, $ne: '' } }));
              if (targetRoles.includes('Admin')) addEmails(await Admin.find({ email: { $exists: true, $ne: '' } }));
              if (targetRoles.includes('Branch Manager')) addEmails(await BranchManager.find({ email: { $exists: true, $ne: '' } }));
              if (targetRoles.includes('Accountant')) addEmails(await Accountant.find({ email: { $exists: true, $ne: '' } }));
            }
            if (targetUsers && targetUsers.length > 0) {
              addEmails(await Trustee.find({ _id: { $in: targetUsers }, email: { $exists: true, $ne: '' } }));
              addEmails(await Admin.find({ _id: { $in: targetUsers }, email: { $exists: true, $ne: '' } }));
              addEmails(await BranchManager.find({ _id: { $in: targetUsers }, email: { $exists: true, $ne: '' } }));
              addEmails(await Accountant.find({ _id: { $in: targetUsers }, email: { $exists: true, $ne: '' } }));
              addEmails(await User.find({ _id: { $in: targetUsers }, email: { $exists: true, $ne: '' } }));
            }
          }

          const emailArray = Array.from(emails);
          if (emailArray.length > 0) {
            console.log(\`[Announcement] Sending \${emailArray.length} emails...\`);
            await sendAnnouncementEmail(
              emailArray,
              'User', 
              announcement.title,
              announcement.message
            );
          }
        } catch (err) {
          console.error('[Announcement Email Error]', err);
        }
      })();
    }
`;

code = code.replace(
  '// If there is an integration logic for Email/WhatsApp, it would be triggered here asynchronously.',
  asyncLogic
);

fs.writeFileSync('e:/trust_management_system/backend/controllers/announcementController.js', code);
console.log('Email integration logic injected');
