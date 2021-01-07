const Router = require("express").Router();
const Feed = require("../../database/models/Activity");
const Mission = require("../../database/models/Mission");

Router.get("/feed", async (req, res) => {
  try {
    const feeds = await Feed.find({ status: "accepted" });
    const feedToBeShown = [];
    for (let index = 0; index < feeds.length; index++) {
      const { mission } = feeds[index];
      const missionStatement = await Mission.findById(mission);
      if (missionStatement.Feed) {
        feedToBeShown.push(feeds[index]);
      }
    }
    return res.status(200).json({ activityFeeds: feedToBeShown });
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
