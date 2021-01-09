const request = require("request");

const sendUrlNew = "https://rest-api.d7networks.com/secure/send";

const options = (url, body) => ({
  method: "POST",
  url,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic Y29veDk5MDY6Y1JiQjV5QlM=`,
  },
  body,
});

const apiAction = async (option) => {
  request(option, (error, response) => {
    if (error) throw new Error(error);
    console.log(response.body);
  });
};

const newBody = (mobile, otp) => {
  const mobileNo = `91${mobile}`;
  const content = `From: Happy Hunt Team\n---------------------\nYour OTP is ${otp} `;
  const body = {
    to: mobileNo,
    content,
    from: "SMSINFO",
    dlr: "yes",
    "dlr-method": "POST",
    "dlr-level": "2",
    "dlr-url": "https://yourcustompostbackurl.com",
  };
  return JSON.stringify(body);
};

const sendOtp = async (mobileNo, otp) => {
  const body = newBody(mobileNo, otp);
  await apiAction(options(sendUrlNew, body));
};
sendOtp(7768089260, 12345);

/* module.exports = {
  sendOtp,
}; */
