const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;
const EXPIRES = process.env.TOKEN_EXPIRES;

const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, SECRET, { expiresIn: EXPIRES });
  return token;
};
const validateToken = (token) => {
  return jwt.verify(token, SECRET, (error, data) => {
    if (error) return null;
    return data;
  });
};
const validateAuth = (req, res, next) => {
  const userLocalStorg = req.body.userLocalStorg;
  if (!userLocalStorg) return res.sendStatus(401);

  const { token } = userLocalStorg;

  if (!token) return res.sendStatus(401);
  const { user } = validateToken(token) || {};
  if (!user) return res.sendStatus(401);
  req.user = user;

  next();
};

module.exports = { generateToken, validateToken, validateAuth };
