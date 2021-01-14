import apisauce from "apisauce";

const client = apisauce.create({
  baseURL: "http://localhost:5000/",
});

client.addAsyncRequestTransform(async (request) => {
  const authToken = await localStorage.getItem("token");
  if (!authToken) return;
  request.headers["token"] = authToken;
});

export default client;
