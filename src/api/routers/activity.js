const Router = require("express").Router();
const Feed = require("../../database/models/Activity");
const Mission = require("../../database/models/Mission");

Router.get("/feed", async (req, res) => {
  try {
    const feeds = await Feed.find({ status: true })
      .populate("team")
      .populate("mission")
      .exec();
    const feedToBeShown = [];
    console.log(feeds);
    for (let index = 0; index < feeds.length; index += 1) {
      console.log(feeds[index].mission);
      if (feeds[index].mission.Feed) {
        feedToBeShown.push({
          MissionName: feeds[index].mission.MissionName,
          TeamName: feeds[index].team.teamName,
          likes: feeds[index].likes,
          _id: feeds[index]._id,
          team_id: feeds[index].team._id,
          Date: feeds[index].Date,
        });
      }
    }
    console.log(feedToBeShown)
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

    feed.likes += 1;

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
