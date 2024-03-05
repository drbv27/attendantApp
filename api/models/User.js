const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  salt: {
    type: String,
  },
  resetLink: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  this.salt = bcrypt.genSaltSync();
  this.password = await bcrypt.hash(this.password, this.salt);

  next();
});

module.exports = model("Users", userSchema);
