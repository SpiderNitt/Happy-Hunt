import client from "./client";

export const userRegister = (body) =>
  client.post("/auth/player/register", body);

export const resendEmail = (EmailId) =>
  client.get(`/auth/player/resendEmail?emailId=${EmailId}`);

export const resetPassword = (body) => client.post(`/auth/player/reset`, body);

export const forgotPassword = (body) =>
  client.post(`/auth/player/forgotPassword`, body);

export const userMobileNoVerify = (body) =>
  client.post("/auth/player/verify", body);

export const userLogin = (body) => client.post("/auth/login", body);

export const AdminRegister = (email) =>
  client.post("/api/admin/createAdmin", { emailId: email });
