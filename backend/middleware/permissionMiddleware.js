const permissionMiddleware = (moduleName) => {
  return (req, res, next) => {
    // Admins always have full access
    if (req.user.role === 'Admin') {
      return next();
    }
    
    if (req.user.role === 'Trustee') {
      const userPerms = req.user.permissions || [];
      const modulePerm = userPerms.find(p => p.module === moduleName || p === moduleName);
      
      if (!modulePerm) {
        return res.status(403).json({ success: false, message: `Access denied. No permission for ${moduleName}` });
      }

      const level = modulePerm.level || 'View';

      // If the request is a modifying request (POST, PUT, PATCH, DELETE)
      // they must have 'Manage' level.
      if (req.method !== 'GET' && level !== 'Manage') {
        return res.status(403).json({ success: false, message: `Access denied. Manage permission required for ${moduleName}` });
      }

      return next();
    }

    // BranchManagers and other roles pass through this specific middleware, 
    // relying on authMiddleware or checkRole checks which are typically applied alongside.
    return next();
  };
};

module.exports = permissionMiddleware;
