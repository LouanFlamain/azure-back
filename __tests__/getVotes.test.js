const { getVotesHandler } = require("../src/functions/getVotes");

describe("getVotes", () => {
  it("200 et retourne un tableau", async () => {
    const fakeDocs = [{ id: "1", user_id: "u", result: true }];
    const ctx = {
      extraInputs: { get: () => fakeDocs },
    };
    const res = await getVotesHandler({}, ctx);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.jsonBody)).toBe(true);
    expect(res.jsonBody[0].id).toBe("1");
  });
});
