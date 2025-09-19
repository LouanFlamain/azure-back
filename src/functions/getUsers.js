// getUsers.js
const { app, input } = require("@azure/functions");

const usersIn = input.cosmosDB({
  connection: "COSMOS_CONN_STRING",
  databaseName: "bayroumeterdb",
  containerName: "users",
  sqlQuery: "SELECT * FROM c",
});

app.http("getUsers", {
  methods: ["GET"],
  authLevel: "anonymous",
  extraInputs: [usersIn],
  handler: async (_req, ctx) => {
    const docs = ctx.extraInputs.get(usersIn) || [];
    return { status: 200, jsonBody: docs };
  },
});
