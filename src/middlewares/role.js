const adminVerify = async (req, res, next) => {
  if (req.jwt_payload.Role !== "Admin" && req.jwt_payload.Role !== "SuperAdmin")
    return res.status(400).json({ message: "Access denied" });
  return next();
};
const playerVerify = async (req, res, next) => {
  if (
    req.jwt_payload.Role !== "Player" &&
    req.jwt_payload.Role !== "TeamMember" &&
    req.jwt_payload.Role !== "TeamLeader"
  )
    return res.status(400).json({ message: "Access denied" });
  return next();
};
const leaderVerify = async (req, res, next) => {
  if (req.jwt_payload.Role !== "TeamLeader")
    return res.status(400).json({ message: "Access denied" });
  return next();
};
const superAdminVerify = async (req, res, next) => {
  if (req.jwt_payload.Role !== "SuperAdmin")
    return res.status(400).json({ message: "Access denied" });
  return next();
};
module.exports = { adminVerify, playerVerify, superAdminVerify, leaderVerify };
