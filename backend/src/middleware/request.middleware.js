function requestLogger(req, res, next) {
  const startedAt = Date.now();

  res.on("finish", () => {
    if (process.env.NODE_ENV === "test") return;
    const durationMs = Date.now() - startedAt;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`);
  });

  next();
}

module.exports = {
  requestLogger,
};
