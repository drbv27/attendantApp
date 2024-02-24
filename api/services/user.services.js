const User = require("../models/User");

class UserServices {
  static async createUser(user) {
    try {
      const newUser = new User({
        ...user,
        email: user.email.toLowerCase(),
      });
      return await newUser.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  static async getAllUsers() {
    try {
      let query = User.find({}).select("-password -salt");
      return await query.exec();
    } catch (error) {
      console.log(error);
    }
  }
  static async getUser(id) {
    try {
      let query = User.findOne({ _id: id }).select("-password -salt");

      return await query.exec();
    } catch (error) {
      console.log(error);
    }
  }
  static async updateUser(body) {
    try {
      const { _id, name, address, phone, email } = body;
      const user = await User.findById(_id);
      user.name = name;
      user.address = address;
      user.phone = phone;
      user.email = email;

      return await user.save();
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteUser(id) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: id });
      return deletedUser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = UserServices;
