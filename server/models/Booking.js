const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
wellnessTips: [
  {
    type: String,
  },
],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    contact: {
        firstName: {
            type: String,
            required: true,
            trim: true,
        
    },

    lastName: {
        type: String,
        required: true,
        trim: true,

    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
},

    appointmentDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);



const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;