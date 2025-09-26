const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const {
  createHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  getHotelsByHost,
} = require("../controllers/hotel.controller");

// PUBLIC ROUTES
router.get("/", getHotels); // get all hotels
router.get("/:id", getHotelById); // get hotel details by id

// HOST OR ADMIN ROUTES
router.post("/", authMiddleware, createHotel); // create hotel (host)
router.put("/:id", authMiddleware, updateHotel); // update hotel (host/admin)
router.delete("/:id", authMiddleware, deleteHotel); // delete hotel (host/admin)

// HOST DASHBOARD
router.get("/host/me", authMiddleware, getHotelsByHost);

module.exports = router;
