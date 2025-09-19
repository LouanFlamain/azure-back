const { app, input } = require("@azure/functions");

const votesIn = input.cosmosDB({
  connection: "COSMOS_CONN_STRING",
  databaseName: "bayroumeterdb",
  containerName: "votes",
  sqlQuery: "SELECT * FROM c",
});

async function getVotesHandler(_req, ctx) {
  const docs = ctx?.extraInputs?.get ? ctx.extraInputs.get(votesIn) || [] : [];
  return { status: 200, jsonBody: docs };
}

app.http("getVotes", {
  methods: ["GET"],
  authLevel: "anonymous",
  extraInputs: [votesIn],
  handler: getVotesHandler,
});

module.exports = { getVotesHandler };
