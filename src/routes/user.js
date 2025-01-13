const express = require("express");
const UserController = require("../app/controllers/userController");
const router = express.Router();

router.get("/", UserController.index);

module.exports = router;
