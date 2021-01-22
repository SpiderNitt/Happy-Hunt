const TeamenRollVerify = async (req, res, next) => {
  if (req.jwt_payload.team === undefined)
    return res.status(400).json({
      message: "join the team to play the game or updated token not used",
    });
  return next();
};

module.exports = { TeamenRollVerify };
