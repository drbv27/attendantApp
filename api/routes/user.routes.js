const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.post("/create", UserController.createUser);
router.get("/all", UserController.getAllUsers);
router.get("/:id", UserController.getUser);
router.put("/update/", UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser);

module.exports = router;
