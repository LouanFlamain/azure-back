const { postUserHandler } = require("../src/functions/postUser");

function mockReq(body) {
  return { json: async () => body };
}

describe("postUser", () => {
  it("400 si body invalide", async () => {
    const res = await postUserHandler(
      {
        json: async () => {
          throw new Error("bad");
        },
      },
      {}
    );
    expect(res.status).toBe(400);
  });

  it("400 si champs manquants", async () => {
    const res = await postUserHandler(mockReq({ pseudo: "a" }), {});
    expect(res.status).toBe(400);
  });

  it("201 si ok", async () => {
    const res = await postUserHandler(
      mockReq({ pseudo: "user", email: "u@e.com" }),
      {
        extraOutputs: { set() {} },
      }
    );
    expect(res.status).toBe(201);
    expect(res.jsonBody.ok).toBe(true);
    expect(res.jsonBody.id).toBeDefined();
  });
});
