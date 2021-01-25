require("dotenv").config({ path: "./src/env/.env" });
const chalk = require("chalk");
const mongoose = require("mongoose");

// checking connection to db
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.CLOUD_DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(chalk.bold.red(error.message)));
db.once("open", () => console.log(chalk.green.bold("connected to database")));
