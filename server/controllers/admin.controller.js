const User = require("../models/user");
const Hotel = require("../models/hotel");
const Room = require("../models/room");
const Booking = require("../models/booking");
const Review = require("../models/review");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can access this" });
    }

    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can delete users" });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL HOTELS
const getAllHotels = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can access this" });
    }

    const hotels = await Hotel.find().populate("host", "fullName email");
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Get all hotels error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE HOTEL
const deleteHotel = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can delete hotels" });
    }

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Delete all rooms of this hotel
    await Room.deleteMany({ hotel: hotel._id });

    // Delete all reviews of this hotel
    await Review.deleteMany({ hotel: hotel._id });

    // Optionally: delete bookings associated with hotel
    await Booking.deleteMany({ hotel: hotel._id });

    await hotel.deleteOne();

    res
      .status(200)
      .json({ message: "Hotel and related data deleted successfully" });
  } catch (error) {
    console.error("Delete hotel error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL BOOKINGS
const getAllBookings = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can access this" });
    }

    const bookings = await Booking.find()
      .populate("guest", "fullName email")
      .populate("hotel", "name")
      .populate("room", "name");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get all bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL REVIEWS
const getAllReviews = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can access this" });
    }

    const reviews = await Review.find()
      .populate("guest", "fullName")
      .populate("hotel", "name")
      .populate("room", "name");

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get all reviews error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllHotels,
  deleteHotel,
  getAllBookings,
  getAllReviews,
};
