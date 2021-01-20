/* eslint-disable node/no-unsupported-features/es-syntax */
const axios = require("axios");
const FormData = require("form-data");
require("dotenv").config({ path: "./src/env/.env" });
const User = require("../../database/models/User");

const send = async (mobile) => {
  const data = new FormData();
  data.append("mobile", `91${mobile}`);
  data.append("sender_id", "SMSINFO");
  data.append(
    "message",
    "Greetings from Happy Hunt Challenge Your one time password is {code}.             Don't share it with strangers "
  );
  data.append("expiry", "900");

  const config = {
    method: "post",
    url: "https://d7networks.com/api/verifier/send",
    headers: {
      Authorization: `Token ${process.env.D7_TOKEN}`,
      ...data.getHeaders(),
    },
    data,
  };

  try {
    const response = await axios(config);
    console.log(response.data);
    const result = await User.updateOne(
      { phoneNo: mobile },
      { otpId: response.data.otp_id }
    );
    if (result.nModified === 1) return true;
    return false;
  } catch (message) {
    console.log(message);
    return false;
  }
};
send("7358275270");
module.exports = send;
