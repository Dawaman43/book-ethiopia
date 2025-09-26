const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
