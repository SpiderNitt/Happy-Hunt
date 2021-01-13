/* eslint-disable node/no-unsupported-features/es-syntax */
const axios = require("axios");
const FormData = require("form-data");

const resend = async (otpId) => {
  const data = new FormData();
  data.append("otp_id", otpId);

  const config = {
    method: "post",
    url: "https://d7networks.com/api/verifier/resend",
    headers: {
      Authorization: `Token ${process.env.D7_TOKEN}`,
      ...data.getHeaders(),
    },
    data,
  };

  try {
    const response = axios(config);
    return response.data;
  } catch (message) {
    console.log(message.response.data);
  }
  return 0;
};

module.exports = resend;
