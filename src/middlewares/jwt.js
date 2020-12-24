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
        return await logout(req, res, "Invalid Token or Token expired", 403);
      if (!mongoose.Types.ObjectId.isValid(decoded.id))
        // eslint-disable-next-line no-return-await
        return await logout(req, res, "Invalid userId", 400);
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
