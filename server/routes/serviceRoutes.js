const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const ownerOnly = require("../middleware/ownerOnly");

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getAllServicesForOwner,
} = require("../controllers/serviceController");

router.get("/", getServices);

router.get(
  "/owner/all",
  protect,
  ownerOnly,
  getAllServicesForOwner
);

router.get("/:id", getServiceById);

router.post(
  "/",
  protect,
  ownerOnly,
  createService
);

router.put(
  "/:id",
  protect,
  ownerOnly,
  updateService
);

router.delete(
  "/:id",
  protect,
  ownerOnly,
  deleteService
);

module.exports = router;