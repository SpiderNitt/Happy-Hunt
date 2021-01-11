import client from "./client";

export const userRegister = (body) =>
  client.post("/auth/player/register", body);

export const userMobileNoVerify = (body) =>
  client.post("/auth/player/verify", body);

export const AdminRegister = (email) =>
  client.post("/auth/create_admin", { emailId: email });
