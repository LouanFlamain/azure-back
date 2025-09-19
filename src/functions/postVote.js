const { app, output } = require("@azure/functions");
const crypto = require("node:crypto");

const outDoc = output.cosmosDB({
  connection: "COSMOS_CONN_STRING",
  databaseName: "bayroumeterdb",
  containerName: "votes",
  createIfNotExists: true,
});

async function postVoteHandler(req, ctx) {
  let body;
  try {
    body = await req.json();
  } catch {
    return { status: 400, jsonBody: { error: "Body JSON invalide" } };
  }

  const { user_id, result } = body || {};
  if (typeof result !== "boolean") {
    return {
      status: 400,
      jsonBody: { error: "Champs requis: 'result' (bool)" },
    };
  }

  const doc = {
    id: crypto.randomUUID(),
    user_id,
    result,
    createdAt: new Date().toISOString(),
  };

  if (ctx?.extraOutputs?.set) ctx.extraOutputs.set(outDoc, doc);

  return { status: 201, jsonBody: { ok: true, id: doc.id } };
}

app.http("postVote", {
  methods: ["POST"],
  authLevel: "anonymous",
  extraOutputs: [outDoc],
  handler: postVoteHandler,
});

module.exports = { postVoteHandler };
