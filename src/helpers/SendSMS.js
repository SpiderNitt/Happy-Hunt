const request = require("request");

const options = (data) => ({
  method: "POST",
  url: "https://d7networks.com/api/verifier/send",
  headers: {
    Authorization: `Token 20b6a5a40e2cbed784bcbc2932b40cfa7c50296c`,
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
const apiAction = async (option) => {
  request(option, (error, response) => {
    if (error) throw new Error(error);
    console.log(response.body);
  });
};

const sendOtp = async (mobileNo) => {
  const userbody = body(mobileNo);

  await apiAction(options(userbody.data));
};
sendOtp(7768089260);

/* module.exports = {
  sendOtp,
}; */
