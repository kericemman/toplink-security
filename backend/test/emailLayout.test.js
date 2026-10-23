const test = require("node:test");
const assert = require("node:assert/strict");
const {
  emailLayout,
  ENGAGEMENTS_EMAIL,
} = require("../src/templates/emailLayout");

test("transactional notifications use the TopLink .co.ke email layout", () => {
  const html = emailLayout({ content: "<p>Payment confirmed.</p>" });

  assert.match(html, /TopLink Security/);
  assert.match(html, /Risk &amp; Governance Advisory/);
  assert.match(html, /Payment confirmed\./);
  assert.match(html, /https:\/\/toplinksecurity\.co\.ke/);
  assert.match(html, new RegExp(`mailto:${ENGAGEMENTS_EMAIL}`));
  assert.equal(ENGAGEMENTS_EMAIL, "engagements@toplinksecurity.co.ke");
});
