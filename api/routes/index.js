const express = require("express");
const router = express.Router();
const auth = require("./auth.routes");
const users = require("./user.routes");
const athletes = require("./athletes.routes");
const attendances = require("./attendances.routes");
const groups = require("./groups.routes");

router.use("/auth", auth);
router.use("/users", users);
router.use("/athletes", athletes);
router.use("/groups", groups);
router.use("/attendances", attendances);

module.exports = router;
