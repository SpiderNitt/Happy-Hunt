import apisauce from "apisauce";

const client = apisauce.create({
  baseURL: "http://localhost:5000/",
  headers: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmQ5ZGU5Mjg2MDVkMjUyNDEwZmM4OSIsImlhdCI6MTYxMDUyMTg2MSwiZXhwIjoxNjExMTI2NjYxfQ.yHKm_ktg5H_Qv1m2d7w4Dvqh5Qewyibju4p4qrrQ-xc"
  }
});

client.addAsyncRequestTransform(async (request) => {
  const authToken = await localStorage.getItem("token");
  if (!authToken) return;
  request.headers["token"] = authToken;
});

export default client;
