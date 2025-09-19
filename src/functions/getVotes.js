const { app, input } = require("@azure/functions");

const votesIn = input.cosmosDB({
  connection: "COSMOS_CONN_STRING",
  databaseName: "bayroumeterdb",
  containerName: "votes",
  sqlQuery: "SELECT * FROM c",
});

app.http("getVotes", {
  methods: ["GET"],
  authLevel: "anonymous",
  extraInputs: [votesIn],
  handler: async (_req, ctx) => {
    console.log("test");
    const docs = ctx.extraInputs.get(votesIn) || [];
    return { status: 200, jsonBody: docs };
  },
});
