const { app, output } = require("@azure/functions");
const crypto = require("node:crypto");

const outDoc = output.cosmosDB({
  connection: "COSMOS_CONN_STRING",
  databaseName: "bayroumeterdb",
  containerName: "users",
  createIfNotExists: true,
});

async function postUserHandler(req, ctx) {
  let body;
  try {
    body = await req.json();
  } catch {
    return { status: 400, jsonBody: { error: "Body JSON invalide" } };
  }

  const { pseudo, email } = body || {};
  if (typeof pseudo !== "string" || typeof email !== "string") {
    return {
      status: 400,
      jsonBody: {
        error: "Champs requis: 'pseudo' (string) et 'email' (string)",
      },
    };
  }

  const doc = {
    id: crypto.randomUUID(),
    pseudo,
    email,
    createdAt: new Date().toISOString(),
  };

  if (ctx?.extraOutputs?.set) ctx.extraOutputs.set(outDoc, doc);

  return { status: 201, jsonBody: { ok: true, id: doc.id } };
}

// En prod, on enregistre dans Azure Functions
app.http("postUser", {
  methods: ["POST"],
  authLevel: "anonymous",
  extraOutputs: [outDoc],
  handler: postUserHandler,
});

module.exports = { postUserHandler };
