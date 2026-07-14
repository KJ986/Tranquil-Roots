//import packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");


//Create Express App
const app = express();

connectDB();

//Set Port
const PORT = process.env.PORT|| 5000;

//Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);


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
