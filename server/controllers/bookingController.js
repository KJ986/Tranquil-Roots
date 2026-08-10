const Booking = require("../models/Booking");
const Service = require("../models/Service");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const {
        service, 
        appointmentDate, 
        notes, 
        contact,
     } = req.body;

     //Make sure appt is in the future
     const selectedDate = new Date(appointmentDate);

     if (selectedDate <= new Date()) {
        return res.status(400).json({
            message: "Appointment date must be in the future."
        });
     }

     // Contact validation
     if (
        !contact ||
        !contact.firstName ||
        !contact.lastName ||
        !contact.email ||
        !contact.phone
     ) {
        return res.status(400).json({
            message: "Complete contact information is required.",
        });
     }

    // Make sure the selected service exists
    const selectedService = await Service.findById(service);

    if (!selectedService) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    // Create the booking for the logged-in user
    const booking = await Booking.create({
      user: req.user._id,
      service,
      contact: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
      },
      appointmentDate,
      notes,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate("user", "firstName lastName email")
      .populate("service", "name duration price category");

    res.status(201).json({
      message: "Booking created successfully!",
      booking: populatedBooking,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};

// Get all bookings for the logged- in user
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
        user: req.user._id,
    })
      .populate("user", "firstName lastName email")
      .populate("service", "name duration price category")
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};



    // Get one booking
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
    })
      .populate("service", "name duration category")
      .populate("user", "firstName lastName email");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};

    //Update a Booking
    const updateBooking = async (req, res) => {
        try { 
            if (req.body.appointmentDate) {
  const selectedDate = new Date(req.body.appointmentDate);

  if (selectedDate <= new Date()) {
    return res.status(400).json({
      message: "Appointment date must be in the future.",
    });
  }
}
            const booking = await Booking.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.user._id,
                },
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            )
            .populate("user", "firstName lastName email")
            .populate("service", "name duration price category");

            if (!booking) {
                return res.status(404).json({
                    message: "Booking not found.",
                });
            }
            res.status(200).json({
                message: "Booking Updated successfully!",
                booking,
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Server error.",
            });
        }
    };


 // Delete a booking that belongs to the logged-in user
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      message: "Booking cancelled successfully!",
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid booking ID.",
      });
    }

    res.status(500).json({
      message: "Server error.",
    });
  }
};

// Get all bookings for the ownwer
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
    .populate("user", "firstName lastName email")
    .populate("service", "name duration price category")
    .sort({ appointmentDate: 1 });

    res.status(200).json({
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};

// Owner updates booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status.",
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user", "firstName lastName email")
      .populate("service", "name duration price category");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      message: "Booking status updated successfully!",
      booking,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error.",
    });
  }
};


module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getAllBookings,
  updateBookingStatus,
};