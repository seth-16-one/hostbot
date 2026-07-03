function notFound(req, res) {
  return res.status(404).json({
    message: "Route not found",
  });
}

function errorHandler(error, req, res, next) {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  const status = error.status || 500;

  return res.status(status).json({
    message:
      status >= 500
        ? "Something went wrong. Please try again."
        : error.message || "Request failed. Please try again.",
  });
}

module.exports = {
  notFound,
  errorHandler,
};
