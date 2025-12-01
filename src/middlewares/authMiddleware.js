const jwt = require("jsonwebtoken");
const SECRET_KEY = "SHAB7888";

// Middleware to authenticate requests
exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};
