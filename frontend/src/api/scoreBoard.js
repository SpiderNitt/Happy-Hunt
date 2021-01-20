import client from "./client";

export const scoreboard = () => client.get("/api/scoreboard");
