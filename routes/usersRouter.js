const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");

router.get("/", controller.getUsers);
router.get("/new", controller.getUserForm);
router.post("/new", controller.postNewUser);
router.get("/delete", controller.deleteAllUsers);

module.exports = router;
