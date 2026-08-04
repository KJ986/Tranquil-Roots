const Service = require("../models/Service");

// Create a new service
const createService = async (req, res) => {
  try {
    const {
      name,
      description,
      duration,
      price,
      category,
      image,
      isActive,
    } = req.body;

    if (!name || !description || !duration || !price || !category) {
      return res.status(400).json({
        message: "Please provide all required service fields.",
      });
    }

    const service = await Service.create({
      name,
      description,
      duration,
      price,
      category,
      image,
      isActive,
    });

    res.status(201).json({
      message: "Service created successfully!",
      service,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Server error.",
    });
  }
};

// Get all active services
const getServices = async (req, res) => {
  try {
    const services = await Service.find({
      isActive: true,
    }).sort({ createdAt: -1 });
    

    res.status(200).json({
      count: services.length,
      services,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};

// Get one service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.find({ isActive: true }).sort({ createdAt: -1 });

    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    res.status(200).json({
      service,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid service ID.",
      });
    }

    res.status(500).json({
      message: "Server error.",
    });
  }
};

//Update Service
const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    res.status(200).json({
      message: "Service updated successfully!",
      service,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};

//Delete Service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    res.status(200).json({
      message: "Service deleted successfully!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};