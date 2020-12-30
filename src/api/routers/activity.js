const Router = require("express").Router();
const Feed = require("../../database/models/Activity");

Router.get("/feed", async (req, res) => {
  try {
    const feeds = await Feed.find({ status: "accepted", ShouldBeShown: true });
    res.status(200).json({ actiityFeeds: feeds });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
Router.get("/feed/likes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let feed = await Feed.findById(id);
    if (!feed) {
      res.status(404).json({ message: "no such feed found" });
    }
    console.log("previous", feed.likes);
    feed.likes += 1;
    console.log("after", feed.likes);
    feed.save();
    res.status(200).json({ message: "post liked" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
module.exports = Router;
