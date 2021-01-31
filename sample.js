player.post(
  "/submission",
  multer({ storage: multer.memoryStorage() }).single("answer"),
  playerVerify,
  TeamenRollVerify,
  async (req, res) => {
    try {
      const { team } = req.jwt_payload;
      const user = await Team.findById(team);
      const { mission } = req.body;
      if (!mission) return res.status(400).json({ message: "Fill all fields" });
      const submit = await Mission.findById(mission);
      const answerType = submit.answer_Type;
      const { Category, visibility, ServerEvaluation, maxPoints } = submit;
      if (answerType === undefined || answerType === null) {
        return res.status(404).json({ message: "Mission not found" });
      }
      let answer;
      let notification;
      try {
        switch (answerType) {
          case "Picture": {
            if (req.file === undefined || req.file == null)
              return res.status(400).json({ message: "No picture submission" });
            answer = req.file.buffer.toString("base64");
            break;
          }

          case "Text": {
            if (req.body.answer === undefined || req.body.answer == null)
              return res.status(400).json({ message: "No text submission" });
            answer = req.body.answer;
            break;
          }
          case "Video": {
            if (req.file === undefined || req.file == null)
              return res.status(400).json({ message: "No video submission" });
            answer = req.file.buffer.toString("base64");
            break;
          }
          case "Picture and Location": {
            if (req.file === undefined || req.file == null)
              return res.status(400).json({ message: "No picture submission" });
            const { Lat, Long } = submit.Location;
            const lat = Lat.toString();
            const lon = Long.toString();
            const { latSub, lonSub } = req.body;
            const distance = geolib.getDistance(
              { latitude: lat, longitude: lon },
              { latitude: latSub, longitude: lonSub }
            );
            if (distance > 5000)
              return res
                .status(200)
                .json({ message: "You haven't reached the location" });
            answer = req.file.buffer.toString("base64");
            break;
          }
          default: {
            return res
              .status(401)
              .json({ message: "Database error,answerType improper" });
          }
        }
        let result;
        if (ServerEvaluation && answerType === "Text") {
          const originalAnswer = submit.answer;
          let rightAnswer = false;
          for (let i = 0; i < originalAnswer.length; i += 1) {
            if (originalAnswer[i] === answer) {
              rightAnswer = true;
            }
          }
          if (rightAnswer) {
            const { hintsTaken } = await Activity.findOne({
              mission,
              team,
              isSubmitted: false,
            });
            let { points } = await Team.findById(team);
            const marks = maxPoints / 2 - hintsTaken * 20;
            points += marks;
            const teamResult = await Team.updateOne({ _id: team }, { points });
            if (teamResult.nModified !== 1)
              return res
                .status(404)
                .json({ message: "Team score not updated" });
            result = await Activity.updateOne(
              { team, mission, isSubmitted: false },
              {
                Answer: answer,
                category: Category,
                status: true,
                ShouldBeShown: visibility,
                isSubmitted: true,
              }
            );
            // team
            notification = `You got right answer for ${submit.MissionName}`;
          } else {
            notification = `You got wrong answer for ${submit.MissionName}`;
            return res.status(200).json({ message: "Your answer is wrong" });
          }
          user.Notifications.push(notification);
          await user.save();
          io.emit(`Notifications ${team}`, notification);
        } else if (ServerEvaluation) {
          const { hintsTaken } = await Activity.findOne({
            mission,
            team,
            isSubmitted: false,
          });
          let { points } = await Team.findById(team);
          const marks = maxPoints / 2 - hintsTaken * 20;
          points += marks;
          const teamResult = await Team.updateOne({ _id: team }, { points });
          if (teamResult.nModified !== 1)
            return res.status(404).json({ message: "Team score not updated" });
          result = await Activity.updateOne(
            { team, mission, isSubmitted: false },
            {
              Answer: answer,
              category: Category,
              status: true,
              ShouldBeShown: visibility,
              isSubmitted: true,
            }
          );
          // team
          notification = `You got right answer for ${submit.MissionName}`;
          user.Notifications.push(notification);
          await user.save();
          io.emit(`Notifications ${team}`, notification);
        } else {
          result = await Activity.updateOne(
            { team, mission, isSubmitted: false },
            {
              Answer: answer,
              category: Category,
              status: false,
              ShouldBeShown: visibility,
              isSubmitted: true,
            }
          );
          // admin
          const head = await User.findOne({ Role: "SuperAdmin" });
          notification = `New submission for ${submit.MissionName} by team ${user.teamName}`;
          head.Notifications.push(notification);
          await head.save();
          io.emit(`Notifications`, notification);
        }
        if (result.nModified === 1) {
          return res.status(200).json({ message: "Successfully submitted" });
        }
        if (result.n === 1) {
          return res.status(204).json({ mission: "Activity unable to submit" });
        }
        return res.status(404).json({ message: "Activity not found" });
      } catch (error) {
        console.log(error);
        return res.status(416).json({ message: "Cannot submit answer" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error, Try again later" });
    }
  }
);
