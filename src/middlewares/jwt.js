const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createJWTtoken = async (user) =>
  jwt.sign(
    {
      id: user.Id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "168h" }
  );

const jwtVerify = (req, res, next) => {
  try {
    const { token } = req.session;
    if (!token) return res.status(401).json({ message: "No token" });
    // console.log(process.env.TOKEN_SECRET)
    // console.log(token)
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decoded) => {
      req.jwt_payload = decoded;
      if (error)
        return res
          .status(404)
          .json({ message: "Invalid Token or Token expired" });
      if (!mongoose.Types.ObjectId.isValid(decoded.id))
        return res.status(400).json({ message: "Invalid userId" });
      req.user = true;
      return next();
    });
    return null;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error. Try again later" });
  }
};

module.exports = {
  jwtVerify,
  createJWTtoken,
};
