/* eslint-disable node/no-unsupported-features/es-syntax */
const axios = require("axios");
const FormData = require("form-data");

const verify = async (otpCode, otpId) => {
  const data = new FormData();
  data.append("otp_id", otpId);
  data.append("otp_code", otpCode);

  const config = {
    method: "post",
    url: "https://d7networks.com/api/verifier/verify",
    headers: {
      Authorization: `Token ${process.env.D7_TOKEN}`,
      ...data.getHeaders(),
    },
    data,
  };

  try {
    const res = await axios(config);
    if (res.data.status === "success") return true;
    return false;
  } catch (message) {
    console.log(message.response.data);
    return false;
  }
};
module.exports = verify;
