const adminVerify = async (req, res, next) => {
  if (req.jwt_payload.role !== "Admin" && req.jwt_payload.role !== "SuperAdmin")
    return res.status(400).json({ message: "Access denied" });
  return next();
};
const playerVerify = async (req, res, next) => {
  if (
    req.jwt_payload.role !== "Player" &&
    req.jwt_payload.role !== "TeamMember" &&
    req.jwt_payload.role !== "TeamLeader"
  )
    return res.status(400).json({ message: "Access denied" });
  return next();
};
const superAdminVerify = async (req, res, next) => {
  if (req.jwt_payload.role !== "SuperAdmin")
    return res.status(400).json({ message: "Access denied" });
  return next();
};
module.exports = { adminVerify, playerVerify, superAdminVerify };
