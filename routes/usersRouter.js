const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");

router.get("/", controller.getUsers);
router.get("/new", controller.getUserForm);
router.post("/new", controller.postNewUser);

module.exports = router;
