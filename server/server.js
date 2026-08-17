//import packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const aiRoutes = require("./routes/aiRoutes");


//Create Express App
const app = express();

connectDB();

//Set Port
const PORT = process.env.PORT|| 5000;

//Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tranquil-roots.vercel.app",
      "https://tranquil-roots-git-main-tranquil-roots.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/ai", aiRoutes);


//First route
app.get("/", (req, res) => {
    res.json({
    message: "Welcome to Tranquil Roots API"
});
});

//Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
