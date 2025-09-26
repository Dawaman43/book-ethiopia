const Room = require("../models/room");
const Hotel = require("../models/hotel");

// CREATE ROOM (host only)
const createRoom = async (req, res) => {
  try {
    const { hotelId, name, description, price, maxGuests, amenities, images } =
      req.body;

    if (req.user.role !== "host") {
      return res.status(403).json({ message: "Only hosts can create rooms" });
    }

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Only the hotel owner can add rooms
    if (hotel.host.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to add rooms to this hotel" });
    }

    const newRoom = new Room({
      hotel: hotelId,
      name,
      description,
      price,
      maxGuests,
      amenities: amenities || [],
      images: images || [],
    });

    await newRoom.save();

    // Add room reference to hotel
    hotel.rooms.push(newRoom._id);
    await hotel.save();

    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    console.error("Create room error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ROOM BY ID (public)
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate(
      "hotel",
      "name address city"
    );
    if (!room) return res.status(404).json({ message: "Room not found" });

    res.status(200).json(room);
  } catch (error) {
    console.error("Get room error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ROOMS BY HOTEL (public)
const getRoomsByHotel = async (req, res) => {
  try {
    const hotelId = req.params.hotelId;
    const rooms = await Room.find({ hotel: hotelId });
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Get rooms by hotel error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE ROOM (host only)
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const hotel = await Hotel.findById(room.hotel);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Only hotel owner or admin can update
    if (req.user.role !== "admin" && hotel.host.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this room" });
    }

    Object.assign(room, req.body);
    await room.save();

    res.status(200).json({ message: "Room updated successfully", room });
  } catch (error) {
    console.error("Update room error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE ROOM (host only)
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const hotel = await Hotel.findById(room.hotel);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    // Only hotel owner or admin can delete
    if (req.user.role !== "admin" && hotel.host.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this room" });
    }

    await room.deleteOne();

    // Remove room from hotel's rooms array
    hotel.rooms = hotel.rooms.filter(
      (rId) => rId.toString() !== room._id.toString()
    );
    await hotel.save();

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Delete room error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createRoom,
  getRoomById,
  getRoomsByHotel,
  updateRoom,
  deleteRoom,
};
