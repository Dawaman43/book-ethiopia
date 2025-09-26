const express = require("express");
const {
  register,
  getUsers,
  login,
  getUserById,
  update,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//required user must be logged in
router.get("/get", authMiddleware, getUsers);
router.get("/get/:id", authMiddleware, getUserById);
router.put("/update-profile/:id", authMiddleware, update);

module.exports = router;
