import apisauce from "apisauce";
import { getToken } from "./storage";

const client = apisauce.create({
  baseURL: "http://localhost:5000/",
});

client.addAsyncRequestTransform(async (request) => {
  const authToken = await getToken();
  if (!authToken) return;
  request.headers["token"] = authToken;
});

export default client;
