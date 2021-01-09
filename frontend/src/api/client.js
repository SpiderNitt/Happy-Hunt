import apisauce from "apisauce";
import { getToken } from "./storage";

const client = apisauce.create({
  baseURL: "http://localhost:3000/",
});

client.addAsyncRequestTransform(async (request) => {
  const authToken = await getToken();
  if (!authToken) return;
  request.headers["Auth-Token"] = authToken;
});

export default client;
