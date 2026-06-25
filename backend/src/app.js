const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const botRoutes = require("./routes/bot.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "hostbot-backend",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/bots", botRoutes);

module.exports = app;
