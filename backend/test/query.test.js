const test = require("node:test");
const assert = require("node:assert/strict");
const { escapeRegex, getPagination } = require("../src/utils/query");

test("search input is escaped before use in a regular expression", () => {
  assert.equal(escapeRegex("risk.*(test)"), "risk\\.\\*\\(test\\)");
});

test("pagination rejects invalid values and caps oversized limits", () => {
  assert.deepEqual(getPagination("-4", "not-a-number"), {
    page: 1,
    limit: 10,
    skip: 0,
  });
  assert.deepEqual(getPagination("3", "500"), {
    page: 3,
    limit: 50,
    skip: 100,
  });
});
