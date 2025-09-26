const Wishlist = require("../models/wishlist");
const Hotel = require("../models/hotel");

// ADD HOTEL TO WISHLIST (guest only)
const addToWishlist = async (req, res) => {
  try {
    if (req.user.role !== "guest") {
      return res
        .status(403)
        .json({ message: "Only guests can add to wishlist" });
    }

    const { hotelId } = req.body;
    if (!hotelId)
      return res.status(400).json({ message: "Hotel ID is required" });

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Check if already in wishlist
    let wishlist = await Wishlist.findOne({ guest: req.user.id });
    if (!wishlist) {
      wishlist = new Wishlist({ guest: req.user.id, hotels: [hotelId] });
    } else {
      if (wishlist.hotels.includes(hotelId)) {
        return res.status(400).json({ message: "Hotel already in wishlist" });
      }
      wishlist.hotels.push(hotelId);
    }

    await wishlist.save();
    res.status(200).json({ message: "Hotel added to wishlist", wishlist });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// REMOVE HOTEL FROM WISHLIST (guest only)
const removeFromWishlist = async (req, res) => {
  try {
    if (req.user.role !== "guest") {
      return res
        .status(403)
        .json({ message: "Only guests can remove from wishlist" });
    }

    const { hotelId } = req.body;
    if (!hotelId)
      return res.status(400).json({ message: "Hotel ID is required" });

    const wishlist = await Wishlist.findOne({ guest: req.user.id });
    if (!wishlist || !wishlist.hotels.includes(hotelId)) {
      return res.status(404).json({ message: "Hotel not found in wishlist" });
    }

    wishlist.hotels = wishlist.hotels.filter((id) => id.toString() !== hotelId);
    await wishlist.save();

    res.status(200).json({ message: "Hotel removed from wishlist", wishlist });
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET WISHLIST (guest only)
const getWishlist = async (req, res) => {
  try {
    if (req.user.role !== "guest") {
      return res.status(403).json({ message: "Only guests can view wishlist" });
    }

    const wishlist = await Wishlist.findOne({ guest: req.user.id }).populate(
      "hotels"
    );
    if (!wishlist) return res.status(200).json({ hotels: [] });

    res.status(200).json({ hotels: wishlist.hotels });
  } catch (error) {
    console.error("Get wishlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
