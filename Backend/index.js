require('dotenv').config();
const express = require("express");
const connectDB = require("./db/index.db");
const userRoutes = require("./routes/userRoute.js");
const bodyParser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
const handleSocketIO = require("./controllers/socket.controller.js");
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./modals/user.modal.js')

const app = express();
const server = http.createServer(app);

// Connecting database
connectDB().then(() => {
    console.log("Mongodb Connected Successfully...!");
});

// Body parser settings
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting routes
app.use("/api/user", userRoutes);

// Socket.io middleware and setting
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Update with your client URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  },
});

io.use( async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    // console.log(user)
    if (!user) {
      console.error("Authentication error: User not found");
      return next(new Error("Authentication error: User not found"));
    }

    socket.request.user = user;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    next(new Error("Authentication error"));
  }
});

handleSocketIO(io);

// Running application on port 3000
server.listen(3000, () => {
  console.log("Server running at: http://localhost:3000");
});
