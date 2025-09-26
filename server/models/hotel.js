const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    address: {
      country: String,
      city: String,
      street: String,
      zip: String,
    },
    location: {
      lat: Number,
      lng: Number,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    facilities: [String], // e.g. wifi, pool
    rating: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
