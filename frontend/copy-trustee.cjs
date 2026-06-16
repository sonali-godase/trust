const fs = require('fs');

let adminCode = fs.readFileSync('e:/trust_management_system/frontend/src/pages/admin/Announcements.jsx', 'utf8');

adminCode = adminCode.replace(
  "import { useAuth } from '../../context/AuthContext';",
  "import { useAuth } from '../../context/AuthContext';\nimport { usePermissions } from '../../hooks/usePermissions';"
);

adminCode = adminCode.replace(
  "const { user } = useAuth();",
  "const { user } = useAuth();\n  const { hasManage } = usePermissions('Announcements');"
);

adminCode = adminCode.replace(
  "Communications & Broadcasts\n          </h2>",
  "Communications & Broadcasts\n            {!hasManage && <span className=\"bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm ml-2\">View Only Access</span>}\n          </h2>"
);

adminCode = adminCode.replace(
  `<button onClick={handleOpenNew} className="flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all whitespace-nowrap">
            <FiPlus /> New Announcement
          </button>`,
  `{hasManage && (
            <button onClick={handleOpenNew} className="flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all whitespace-nowrap">
              <FiPlus /> New Announcement
            </button>
          )}`
);

// We need to replace the edit/delete buttons logic
const buttonDivRegex = /<div className="md:w-32 flex flex-row md:flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-100 gap-2 pt-4 md:pt-0">([\s\S]*?)<\/div>/g;

adminCode = adminCode.replace(buttonDivRegex, `{hasManage && (user?.role === 'Admin' || (ann.createdBy && String(ann.createdBy?._id || ann.createdBy) === String(user?._id))) && (
                        <div className="md:w-32 flex flex-row md:flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-100 gap-2 pt-4 md:pt-0">
                          <button onClick={() => handleEdit(ann)} className="w-full py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">Edit</button>
                          <button onClick={() => handleDelete(ann._id)} className="w-full py-2.5 rounded-lg text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors">Delete</button>
                        </div>
                      )}`);

fs.writeFileSync('e:/trust_management_system/frontend/src/pages/trustee/Announcements.jsx', adminCode);
console.log('Trustee Announcements updated');
