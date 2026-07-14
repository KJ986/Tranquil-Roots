const express = require("express");

const router = express.Router();

const { registerUser } = require("../controllers/authController");

//Test Route 
router.get("/test", (req, res) => {
    res.json({
       message: "Auth route is working!" 
    });
});

//Register Route
router.post("/register", registerUser);

module.exports = router;