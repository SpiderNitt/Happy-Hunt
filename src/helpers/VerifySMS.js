const request = require("request");

const options = (data) => ({
  method: "POST",
  url: "https://d7networks.com/api/verifier/verify",
  headers: {
    Authorization: "Token e502106fa304c9d842f357ceee0bc500b6393109",
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
  request(option, (error, response) => {
    if (error) throw new Error(error);
    console.log(response.body);
  });
};
const VerifyOtp = async (OtpID, OtpCode) => {
  const userbody = body(OtpID, OtpCode);

  await apiAction(options(userbody.data));
};
VerifyOtp("23d33259-77fe-4f94-a6e6-443d11097e6c", 194691);

/* module.exports = {
  VerifyOtp,
}; */
