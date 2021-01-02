import client from "./client";

export const userRegister = (body) =>
  client.post("/auth/player/register", body);
