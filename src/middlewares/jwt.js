const jwt = require("jsonwebtoken");

// eslint-disable-next-line arrow-body-style
const createJWTtoken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      team: user.team,
      Role: user.Role,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "24h" }
  );
};

const jwtVerify = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) return res.status(401).json({ message: "No token" });

    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decoded) => {
      req.jwt_payload = decoded;
      if (error)
        return res
          .status(404)
          .json({ message: "Invalid Token or Token expired" });
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
