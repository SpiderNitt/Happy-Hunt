const { io } = require("./timer");

const Notification = async (rec, notification, id) => {
  if (rec === "admin") {
    io.emit(`Team ${id}`, { notification });
  } else {
    io.emit(`Admin ${id}`, { notification });
  }
};
