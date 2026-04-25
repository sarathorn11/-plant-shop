const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'superscretdonotshare');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const hasPermission = (permissionsRequired) => {
  // Allow passing a single string instead of an array
  const perms = Array.isArray(permissionsRequired) ? permissionsRequired : [permissionsRequired];
  
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'User role not found' });
    }

    // Following frontend PERMISSIONS exactly
    const rolePermissions = {
      Admin: ['create_order', 'process_payment', 'view_orders', 'update_order_status', 'manage_menu', 'view_reports', 'manage_users'],
      Cashier: ['create_order', 'process_payment', 'view_orders'],
      Barista: ['view_orders', 'update_order_status'],
      InventoryManager: ['add_stock', 'view_stock_reports']
    };

    const userPermissions = rolePermissions[req.user.role] || [];
    
    // Check if user has at least one of the required permissions
    const hasAccess = perms.some(p => userPermissions.includes(p));

    if (!hasAccess) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }
    
    next();
  };
};

module.exports = { verifyToken, hasPermission };
