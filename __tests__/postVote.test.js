const { postVoteHandler } = require("../src/functions/postVote");

function mockReq(body) {
  return { json: async () => body };
}

describe("postVote", () => {
  it("400 si body invalide", async () => {
    const res = await postVoteHandler(
      {
        json: async () => {
          throw new Error("bad");
        },
      },
      {}
    );
    expect(res.status).toBe(400);
  });

  it("400 si result non bool", async () => {
    const res = await postVoteHandler(
      mockReq({ user_id: "u1", result: "oui" }),
      {}
    );
    expect(res.status).toBe(400);
  });

  it("201 si ok", async () => {
    const res = await postVoteHandler(
      mockReq({ user_id: "u1", result: true }),
      {
        extraOutputs: { set() {} },
      }
    );
    expect(res.status).toBe(201);
    expect(res.jsonBody.ok).toBe(true);
  });
});
