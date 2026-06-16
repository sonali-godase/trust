const fs = require('fs');

const files = [
  'e:/trust_management_system/frontend/src/pages/admin/Announcements.jsx',
  'e:/trust_management_system/frontend/src/pages/trustee/Announcements.jsx',
  'e:/trust_management_system/frontend/src/pages/branch/Announcements.jsx'
];

const iconRegex = /<div className=\{`w-8 h-8 rounded-full flex items-center justify-center text-sm \$\{ann\.whatsappIntegration \? 'bg-green-50 text-green-500' : 'bg-gray-50 text-gray-300'\}`\} title=\"WhatsApp\"><FiMessageCircle \/><\/div>/g;
const analyticsRegex = /<div className=\"p-6 bg-emerald-50 rounded-xl border border-emerald-100\">[\s\S]*?<\/div>/g;
const checkboxRegex = /<label className=\"flex items-center justify-between cursor-pointer p-2\.5 bg-white border border-slate-200 rounded-lg hover:border-emerald-300 transition-colors\">[\s\S]*?<span className=\"flex items-center gap-2 text-xs font-bold text-slate-700\"><FiMessageCircle className=\"text-emerald-500\"\/> WhatsApp<\/span>[\s\S]*?<input type=\"checkbox\" checked=\{formData\.whatsappIntegration\} onChange=\{\(e\)=>setFormData\(\{...formData, whatsappIntegration: e\.target\.checked\}\)\} className=\"w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500\" \/>[\s\S]*?<\/label>/g;
const textRegex = /WhatsApp integrations, and /g;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the specific blocks
    content = content.replace(iconRegex, '');
    
    // For analytics block, we need to be careful not to remove the wrong block. We'll search for "WhatsApp Enabled" inside it.
    content = content.replace(/<div className=\"p-6 bg-emerald-50 rounded-xl border border-emerald-100\">\s*<p className=\"text-sm font-bold text-green-600 uppercase tracking-widest mb-1\">WhatsApp Enabled<\/p>[\s\S]*?<\/div>/g, '');
    
    content = content.replace(/<label className=\"flex items-center justify-between cursor-pointer p-2\.5 bg-white border border-slate-200 rounded-lg hover:border-emerald-300 transition-colors\">\s*<span className=\"flex items-center gap-2 text-xs font-bold text-slate-700\"><FiMessageCircle className=\"text-emerald-500\"\/> WhatsApp<\/span>[\s\S]*?<\/label>/g, '');
    
    content = content.replace(textRegex, '');
    
    fs.writeFileSync(file, content);
    console.log('Updated', file);
  }
});
