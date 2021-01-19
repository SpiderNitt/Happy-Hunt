import client from "./client";

export const teamRegister = (body) => client.post("/api/team/create", body);

export const joinTeam = (teamID) =>
  client.get(`/api/team/join?teamid=${teamID}`);
