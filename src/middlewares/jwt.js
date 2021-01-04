const jwt = require("jsonwebtoken");

// eslint-disable-next-line arrow-body-style
const createJWTtoken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      team: user.team,
    },
    process.env.TOKEN_SECRET,

    { expiresIn: "168h" }
  );
};

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
