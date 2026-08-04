const express = require("express");

const router = express.Router();

const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

// Create a service
router.post("/", createService);

// Get all active services
router.get("/", getServices);

// Get one service by ID
router.get("/:id", getServiceById);

//Update Service
router.put("/:id", updateService);

//Delete Servivce
router.delete("/:id", deleteService);

module.exports = router;