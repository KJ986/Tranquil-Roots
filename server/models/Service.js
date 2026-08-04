const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
    },

    description: { 
        type: String,
        required: true,
        trim: true,
    },

    duration: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
        enum: [
            "Head Spa",
            "Treatment",
            "Massage",
            "Wellness",
        ],
    },

    price: {
  type: Number,
  required: true,
},

isActive: {
  type: Boolean,
  default: true,
},

    image: {
        type: String,
        default: "",
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Service", serviceSchema);
