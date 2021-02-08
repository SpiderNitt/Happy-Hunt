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
      let like;
      if (feeds[index].likeList.includes(req.jwt_payload.id)) like = true;
      else like = false;
      if (feeds[index].mission.Feed) {
        feedToBeShown.push({
          MissionName: feeds[index].mission.MissionName,
          TeamName: feeds[index].team.teamName,
          Answer: feeds[index].Answer,
          Answer_type: feeds[index].mission.answer_Type,
          likes: feeds[index].likes,
          _id: feeds[index]._id,
          team_id: feeds[index].team._id,
          Date: feeds[index].Date,
          like,
        });
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
    if (!(await Feed.findOne({ _id: id, likeList: req.jwt_payload.id }))) {
      await Feed.updateOne(
        { _id: id },
        { $push: { likeList: req.jwt_payload.id } }
      );
      feed.likes += 1;
      await feed.save();
      return res.status(200).json({ message: "Success", like: true });
    }
    await Feed.updateOne(
      { _id: id },
      { $pull: { likeList: req.jwt_payload.id } }
    );
    feed.likes -= 1;
    await feed.save();
    return res.status(200).json({ message: "Success", like: false });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
module.exports = Router;
