const Router = require("express").Router();
const Feed = require("../../database/models/Activity");
const { jwtVerify } = require("../../middlewares/jwt");

Router.get("/feed", jwtVerify, async (req, res) => {
  try {
    const feeds = await Feed.find({ status: "accepted", ShouldBeShown: true });
    return res.status(200).json({ actiityFeeds: feeds });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
Router.get("/feed/likes/:id", jwtVerify, async (req, res) => {
  try {
    const { id } = req.params;
    const feed = await Feed.findById(id);
    if (!feed) {
      return res.status(404).json({ message: "no such feed found" });
    }
    console.log("previous", feed.likes);
    feed.likes += 1;
    console.log("after", feed.likes);
    feed.save();
    return res.status(200).json({ message: "post liked" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
module.exports = Router;
