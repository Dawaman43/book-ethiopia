const Review = require("../models/review");
const Hotel = require("../models/hotel");
const Room = require("../models/room");

// CREATE REVIEW (guest only)
const createReview = async (req, res) => {
  try {
    if (req.user.role !== "guest") {
      return res
        .status(403)
        .json({ message: "Only guests can create reviews" });
    }

    const { hotelId, roomId, rating, comment } = req.body;

    if (!hotelId && !roomId) {
      return res.status(400).json({ message: "Hotel or Room ID is required" });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    // Verify hotel/room exists
    if (hotelId) {
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    }
    if (roomId) {
      const room = await Room.findById(roomId);
      if (!room) return res.status(404).json({ message: "Room not found" });
    }

    const newReview = new Review({
      guest: req.user.id,
      hotel: hotelId || null,
      room: roomId || null,
      rating,
      comment,
    });

    await newReview.save();

    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    console.error("Create review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET REVIEWS BY HOTEL (public)
const getReviewsByHotel = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const reviews = await Review.find({ hotel: hotelId }).populate(
      "guest",
      "fullName"
    );
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get reviews by hotel error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET REVIEWS BY ROOM (public)
const getReviewsByRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const reviews = await Review.find({ room: roomId }).populate(
      "guest",
      "fullName"
    );
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get reviews by room error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE REVIEW (guest only, owner)
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (req.user.role !== "guest" || review.guest.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this review" });
    }

    const { rating, comment } = req.body;
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    console.error("Update review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE REVIEW (guest only, owner)
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (req.user.role !== "guest" || review.guest.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this review" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createReview,
  getReviewsByHotel,
  getReviewsByRoom,
  updateReview,
  deleteReview,
};
