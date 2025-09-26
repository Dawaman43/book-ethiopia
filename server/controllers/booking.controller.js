const Booking = require("../models/booking");
const Room = require("../models/room");
const Hotel = require("../models/hotel");

// CREATE BOOKING (guest only)
const createBooking = async (req, res) => {
  try {
    if (req.user.role !== "guest") {
      return res.status(403).json({ message: "Only guests can make bookings" });
    }

    const { roomId, checkIn, checkOut, guests } = req.body;

    if (!roomId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const room = await Room.findById(roomId).populate("hotel");
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Optional: check room availability here

    const newBooking = new Booking({
      guest: req.user.id,
      room: roomId,
      hotel: room.hotel._id,
      checkIn,
      checkOut,
      guests,
      status: "confirmed", // or "pending" if payment required
    });

    await newBooking.save();

    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET BOOKINGS BY USER (guest dashboard)
const getUserBookings = async (req, res) => {
  try {
    if (req.user.role !== "guest") {
      return res
        .status(403)
        .json({ message: "Only guests can view their bookings" });
    }

    const bookings = await Booking.find({ guest: req.user.id })
      .populate("room")
      .populate("hotel");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get user bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET BOOKINGS BY HOTEL (host dashboard)
const getHotelBookings = async (req, res) => {
  try {
    if (req.user.role !== "host" && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only hosts or admins can view hotel bookings" });
    }

    const hotels = await Hotel.find({ host: req.user.id });
    const hotelIds = hotels.map((h) => h._id);

    const bookings = await Booking.find({ hotel: { $in: hotelIds } })
      .populate("guest", "fullName email phone")
      .populate("room");

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get hotel bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET BOOKING BY ID (guest or host)
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("guest", "fullName email")
      .populate("room")
      .populate("hotel");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only guest who booked or host/admin of hotel can view
    if (
      (req.user.role === "guest" &&
        booking.guest._id.toString() !== req.user.id) ||
      (req.user.role === "host" &&
        booking.hotel.host.toString() !== req.user.id)
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this booking" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Get booking by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// CANCEL BOOKING (guest only)
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (req.user.role !== "guest" || booking.guest.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this booking" });
    }

    // Optional: check cancellation policy
    booking.status = "canceled";
    await booking.save();

    res.status(200).json({ message: "Booking canceled successfully", booking });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getHotelBookings,
  getBookingById,
  cancelBooking,
};
