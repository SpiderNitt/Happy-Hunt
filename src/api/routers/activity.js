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

    for (let index = 0; index < feeds.length; index += 1) {
      const details = {};
      details.MissionName = feeds[index].mission.MissionName;
      details.TeamName = feeds[index].team.teamName;
      details.likes = feeds[index].likes;
      details._id = feeds[index]._id;
      details.team_id = feeds[index].team._id;
      details.Date = feeds[index].Date;

      if (feeds[index].mission.Feed) {
        feedToBeShown.push(details);
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
