const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token is required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json(`token not valid`);
    });
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authenticate;
