const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
const db = mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database is connected"))
  .catch((err) => console.error(err));

module.exports = db;
