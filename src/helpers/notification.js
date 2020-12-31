const io = require("socket.io").listen(3000);

const Team = require("../database/models/Team");

const Idgenerator = io.sockets.on("connection", async (socket, user) => {
  console.log(socket.id);
  const team = await Team.findById(user.team);
  team.SocketId = socket.id;
  team.save();
});
module.exports = { Idgenerator };
