const permit = (...allowed) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ status: 'error', message: 'Not authenticated' });
    const { role } = req.user;
    if (allowed.includes(role)) return next();
    return res.status(403).json({ status: 'error', message: 'Forbidden: insufficient privileges' });
  };
};

module.exports = { permit };
