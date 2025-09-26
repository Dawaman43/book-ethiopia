const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    name: { type: String, required: true },
    description: String,
    pricePerNight: { type: Number, required: true },
    capacity: { type: Number, required: true },
    bedType: String, // King, Queen, etc.
    amenities: [String],
    availability: [
      {
        date: Date,
        isBooked: { type: Boolean, default: false },
      },
    ],
    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
