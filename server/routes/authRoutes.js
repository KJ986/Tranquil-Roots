const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.get("/test", (req, res) => {
  res.json({
    message: "Auth route is working!",
  });
});

router.get("/me", protect, async (req,res) => {
    res.status(200).json({
        user: req.user,
    });
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);

module.exports = router;