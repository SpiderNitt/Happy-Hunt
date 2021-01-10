const request = require("request");
const { https } = require("follow-redirects");

const options = (data) => ({
  method: "POST",
  url: "https://d7networks.com/api/verifier/verify",
  headers: {
    Authorization: `Token ${process.env.D7_TOKEN}`,
  },
  formData: data,
});
const body = (OtpID, OtpCode) => ({
  data: {
    otp_id: OtpID,
    otp_code: OtpCode,
  },
});

const apiAction = async (option) => {
  try {
    request(option, async (err, response) => {
      const result = JSON.parse(response.body);
      if (result.status !== "success") {
        return true;
      }
      return false;
    });
  } catch (err) {
    console.log(err);
  }
};
const VerifyOtp = async (OtpID, OtpCode) => {
  const userbody = body(OtpID, OtpCode);
  const result = await apiAction(options(userbody.data));
  console.log(result);
  return result;
};

module.exports = VerifyOtp;
