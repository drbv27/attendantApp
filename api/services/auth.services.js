const Users = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken, validateToken } = require("../middlewares/auth");
class AuthService {
  static async login({ email, password }) {
    const master = validateToken(password);
    try {
      const user = await Users.findOne({ email: email });

      if (!user) return 404;
      const userOk = {
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        activationCode: user.activationCode,
      };

      if (!bcrypt.compareSync(String(password), user.password)) {
        return 401; //incorrect pass
      }

      return userOk;
    } catch (error) {
      console.error(error);
    }
  }
  static async forgotPassword(body) {
    try {
      const user = await Users.findOne({ email: body.email });
      if (!user) return "There is no user with that email";
      const token = generateToken(user.email);

      await Users.findOneAndUpdate(
        { email: user.email },
        { $set: { resetLink: token } }
      );
      return {
        status: 200,
        message: "Set Reset Link",
      };
    } catch (error) {
      console.error(error);
    }
  }
  static async resetPassword({ resetLink, newPassword }) {
    if (resetLink) {
      try {
        const validatedUser = await validateToken(resetLink);
        if (!validatedUser)
          return "Your Reset Link has expired or is incorrect";
        const user = await Users.findOne({ email: validatedUser.user });
        if (!user) return "There is no user with this Reset Link";
        if (resetLink === user.resetLink) {
          user.password = newPassword;
          user.resetLink = null;
          return user.save();
        } else return "Incorrect Reset Link";
      } catch (error) {
        console.error(error);
      }
    } else return "You don't own a Reset Link";
  }
}

module.exports = AuthService;
