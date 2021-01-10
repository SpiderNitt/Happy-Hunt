const { https } = require("follow-redirects");
const fs = require("fs");

const verifyOtp = (otpId, otpCode, someCallBack) => {
  const options = {
    method: "POST",
    hostname: "d7networks.com",
    path: "/api/verifier/verify",
    headers: {
      Authorization: `Token ${process.env.D7_TOKEN}`,
    },
    maxRedirects: 20,
  };

  const req = https.request(options, async (res) => {
    const chunks = [];

    res.on("data", (chunk) => {
      chunks.push(chunk);
    });

    res.on("end", async (chunk) => {
      const body = Buffer.concat(chunks);

      someCallBack(body.toString());
    });

    res.on("error", (error) => {
      console.error(error);
    });
  });

  const postData = `------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name="otp_id"\r\n\r\n${otpId}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name="otp_code"\r\n\r\n${otpCode}\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--`;

  req.setHeader(
    "content-type",
    "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  );

  req.write(postData);

  req.end();
};
module.exports = verifyOtp;
