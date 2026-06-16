const fs = require('fs');
let code = fs.readFileSync('e:/trust_management_system/frontend/src/pages/branch/Announcements.jsx', 'utf8');

code = code.replace(/audienceType:\s*['"]All Users['"]/g, "audienceType: ['Specific Branches']");

fs.writeFileSync('e:/trust_management_system/frontend/src/pages/branch/Announcements.jsx', code);
console.log('Branch Announcements completely updated for array type');
