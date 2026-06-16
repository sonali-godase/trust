const fs = require('fs');

const files = [
  'e:/trust_management_system/frontend/src/pages/admin/Announcements.jsx',
  'e:/trust_management_system/frontend/src/pages/trustee/Announcements.jsx',
  'e:/trust_management_system/frontend/src/pages/branch/Announcements.jsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the analytics block for WhatsApp Enabled
    const regex = /<div className=\"p-6 bg-emerald-50 rounded-xl border border-emerald-100\">[\s\S]*?WhatsApp Enabled[\s\S]*?<\/div>/g;
    
    content = content.replace(regex, '');
    
    fs.writeFileSync(file, content);
    console.log('Removed WhatsApp analytics from', file);
  }
});
