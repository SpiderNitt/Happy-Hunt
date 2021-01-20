/* eslint-disable node/no-unsupported-features/es-syntax */
const axios = require("axios");
const FormData = require("form-data");

const send = async (MOBILE) => {
  const data = new FormData();
  data.append("mobile", MOBILE);
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
    return response.data;
  } catch (message) {
    console.log(message.response.data);
  }
  return 0;
};

send("917358275270");

module.exports = send;
