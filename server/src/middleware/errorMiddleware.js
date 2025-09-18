module.exports = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || undefined,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};
