require("dotenv").config();
const express = require("express");
// ... imports

// Init Cron
require("./cron/trending").init();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const path = require("path");
const app = express();

// DB conn
connectDB();

// middleware
app.use(helmet());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/listings", require("./routes/listingRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));

app.get("/", (req, res) => {
  res.send("CampKart Server Running...");
});

// error handler
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR:", err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

// Socket.io Integration
const http = require('http');
const server = http.createServer(app);
const io = require('./socket').init(server);

io.on('connection', (socket) => {
  console.log('Socket Client connected:', socket.id);

  // User joins their own room for private notifications
  socket.on('join', (userId) => {
    if (userId) {
      socket.join(userId);
      console.log(`User ${userId} joined notification room`);
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket Client disconnected');
  });
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
