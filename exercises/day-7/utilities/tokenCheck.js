const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader.split(" ")[1];
  // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token is required." });
  }
  // console.log(process.env.JWT_SECRET);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    // console.log(err);
    return res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = authenticate;
