const express = require("express");
const { register, getUsers, login } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get", getUsers);

module.exports = router;
