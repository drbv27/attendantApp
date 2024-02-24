const { generateToken } = require("../middlewares/auth");
const AuthService = require("../services/auth.services");
const errorHandler = require("../utils/errorHandler.utils");

class AuthController {
  static async me(req, res) {
    try {
      res.send(req.user);
    } catch (error) {
      return console.log(error);
    }
  }
  static async login(req, res) {
    try {
      const user = await AuthService.login(req.body);
      if (user === 401) return res.status(401).send(errorHandler(4));
      if (user === 402) return res.status(401).send(errorHandler(3));
      if (user === 403) return res.status(403).send(errorHandler(5));
      if (user === 404) return res.status(404).send(errorHandler(0, user));
      // Genera el token de autenticación
      const token = generateToken(user);
      return res.status(201).send({ user, token });
    } catch (error) {
      return console.log(error);
    }
  }
  static async forgotPassword(req, res) {
    try {
      const message = await AuthService.forgotPassword(req.body);
      return res.status(200).send(message);
    } catch (error) {
      console.log(error);
    }
  }
  static async resetPassword(req, res) {
    try {
      const message = await AuthService.resetPassword(req.body);
      return res.status(200).send(message);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AuthController;
