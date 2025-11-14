const errorHandler = (err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ status: 'error', message: 'Internal server error', data: err.message });
};

module.exports = errorHandler;
