const express = require("express");
const { register, getUsers } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.get("/get", getUsers);

module.exports = router;
