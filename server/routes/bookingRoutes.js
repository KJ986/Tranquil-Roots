const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const ownerOnly = require("../middleware/ownerOnly");


const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

router.post("/", protect, createBooking);

router.get("/", protect, getBookings);

router.get(
  "/owner/all",
  protect,
  ownerOnly,
  getAllBookings
);

router.put(
  "/owner/:id/status",
  protect,
  ownerOnly,
  updateBookingStatus
);

router.get("/:id", protect, getBookingById);

router.put("/:id", protect, updateBooking);

router.delete("/:id", protect, deleteBooking);

module.exports = router;