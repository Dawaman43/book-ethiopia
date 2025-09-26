const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String }, // optional, useful for bookings
    role: {
      type: String,
      enum: ["guest", "host", "admin"],
      default: "guest",
    },

    // Relationships
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }], // if host
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    wishlist: { type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" },

    // Extra info
    avatar: { type: String }, // profile image
    isVerified: { type: Boolean, default: false }, // email/phone verification
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
