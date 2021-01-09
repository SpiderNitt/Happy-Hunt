const request = require("request");
const User = require("../database/models/User");

const options = (data) => ({
  method: "POST",
  url: "https://d7networks.com/api/verifier/send",
  headers: {
    Authorization: `Token ${process.env.D7_TOKEN}`,
  },
  formData: data,
});
const body = (mobileNo) => ({
  data: {
    mobile: `91${mobileNo}`,
    sender_id: "HappyHuntTeam",
    message: "Your otp code for happy hunt challenge is {code}",
    expiry: "900",
  },
});
const apiAction = async (option, mobileNo) => {
  request(option, async (error, response) => {
    if (error) throw new Error(error);
    const result = JSON.parse(response.body);
    const res = await User.updateOne(
      { phoneNo: mobileNo },
      { otpId: result.otp_id }
    );
    if (result.status === "open" && res.nModified === 1) return true;
    return false;
  });
};

const sendOtp = async (mobileNo) => {
  const userbody = body(mobileNo);
  await apiAction(options(userbody.data), mobileNo);
};

module.exports = sendOtp;
