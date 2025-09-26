const Hotel = require("../models/hotel");
const User = require("../models/user");

// CREATE HOTEL (host only)
const createHotel = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      city,
      country,
      pricePerNight,
      images,
      amenities,
    } = req.body;

    // Only hosts can create hotels
    if (req.user.role !== "host") {
      return res.status(403).json({ message: "Only hosts can create hotels" });
    }

    if (!name || !address || !city || !country || !pricePerNight) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newHotel = new Hotel({
      name,
      description,
      address,
      city,
      country,
      pricePerNight,
      images: images || [],
      amenities: amenities || [],
      host: req.user.id,
    });

    await newHotel.save();

    res
      .status(201)
      .json({ message: "Hotel created successfully", hotel: newHotel });
  } catch (error) {
    console.error("Create hotel error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET HOTEL BY ID (public)
const getHotelById = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId).populate(
      "host",
      "fullName email phone"
    );

    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    res.status(200).json(hotel);
  } catch (error) {
    console.error("Get hotel error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL HOTELS (public) with optional filtering
const getHotels = async (req, res) => {
  try {
    const { city, minPrice, maxPrice } = req.query;
    let filters = {};

    if (city) filters.city = city;
    if (minPrice || maxPrice) filters.pricePerNight = {};
    if (minPrice) filters.pricePerNight.$gte = Number(minPrice);
    if (maxPrice) filters.pricePerNight.$lte = Number(maxPrice);

    const hotels = await Hotel.find(filters).populate("host", "fullName email");

    res.status(200).json(hotels);
  } catch (error) {
    console.error("Get hotels error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE HOTEL (host only)
const updateHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const updates = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Only the host who owns the hotel or admin can update
    if (req.user.role !== "admin" && hotel.host.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this hotel" });
    }

    Object.assign(hotel, updates);
    await hotel.save();

    res.status(200).json({ message: "Hotel updated successfully", hotel });
  } catch (error) {
    console.error("Update hotel error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE HOTEL (host only)
const deleteHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Only the host who owns the hotel or admin can delete
    if (req.user.role !== "admin" && hotel.host.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this hotel" });
    }

    await hotel.deleteOne();
    res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
    console.error("Delete hotel error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET HOTELS BY HOST (for dashboard)
const getHotelsByHost = async (req, res) => {
  try {
    const hostId = req.user.id;
    const hotels = await Hotel.find({ host: hostId });
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Get host hotels error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createHotel,
  getHotelById,
  getHotels,
  updateHotel,
  deleteHotel,
  getHotelsByHost,
};
