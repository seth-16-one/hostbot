const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");
const { requestLogger } = require("./middleware/request.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "hostbot-backend",
  });
});

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
