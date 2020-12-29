const multer = require("multer");
const submission = require("express").Router();
const Mission = require("../../database/models/Mission");
const Activity = require("../../database/models/Activity");
const User = require("../../database/models/User");

submission.post(
  "/submission",
  multer({ storage: multer.memoryStorage() }).single("answer"),
  async (req, res) => {
    try {
      const user = req.jwt_payload.id;
      const { mission, shown, hintsTaken } = req.body;
      const { team } = await User.findOne({ Id: user });
      if (!mission || !hintsTaken)
        return res.status(400).json({ message: "Fill all fields" });
      const submit = await Mission.findById(mission);
      const answerType = submit.answer_Type;
      const { Category } = submit;
      console.log(req.file);
      if (answerType === undefined || answerType === null) {
        return res.status(404).json({ message: "Mission not found" });
      }
      let answer;
      try {
        switch (answerType) {
          case "Picture": {
            if (req.file.buffer === undefined || req.file.buffer == null)
              return res.status(400).json({ message: "No picture submission" });
            answer = req.file.buffer.toString("base64");
            break;
          }

          case "Text": {
            if (req.file.buffer === undefined || req.file.buffer == null)
              return res.status(400).json({ message: "No text submission" });
            answer = req.body.answer;
            break;
          }
          case "Video": {
            if (req.file.buffer === undefined || req.file.buffer == null)
              return res.status(400).json({ message: "No video submission" });
            answer = req.file.buffer.toString("base64");
            break;
          }
          case "Picture and Location": {
            if (req.file.buffer === undefined || req.file.buffer == null)
              return res.status(400).json({ message: "No picture submission" });
            const { lat, lon } = submit.location;
            const { latSub, lonSub } = req.body;
            const distance =
              3963.0 *
              Math.acos(
                Math.sin(lat / 57.295) * Math.sin(latSub / 57.295) +
                  Math.cos(lat / 57.295) *
                    Math.cos(latSub / 57.295) *
                    Math.cos((lon - lonSub) / 57.295)
              );
            if (distance < 0.5)
              return res
                .status(200)
                .json({ message: "U havent reached the location" });
            answer = req.file.buffer.toString("base64");
            break;
          }
          default: {
            return res
              .status(500)
              .json({ message: "Database error,answerType improper" });
          }
        }

        const activity = Activity.create(
          {
            team,
            Answer: answer,
            category: Category,
            status: "Pending",
            ShouldBeShown: shown,
            mission,
            hintsTaken,
          },
          (err, result) => {
            if (err) console.log(err.message);

            return res.status(200).json({ message: "Successfully submitted" });
          }
        );
      } catch (error) {
        console.log(error.message);
        return res.status(416).json({ message: "File upload issue" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error, Try again later" });
    }
  }
);
module.exports = submission;
