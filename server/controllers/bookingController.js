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

// Get all bookings
const getBookings = async (req, res) => {
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

//Get a booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
        .populate("user", "firstName lastName email")
        .populate("service", "name duration price  category");

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
            const booking = await Booking.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            )
            .populate("user", "fistName lastName email")
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

    // Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      message: "Booking deleted successfully!",
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
};