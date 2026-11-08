const test = require("node:test");
const assert = require("node:assert/strict");
const emailService = require("../src/services/emailService");
const { ENGAGEMENTS_EMAIL } = require("../src/templates/emailLayout");

test("admin notifications copy engagements when the admin recipient is different", async (t) => {
  const previousAdminEmail = process.env.ADMIN_EMAIL;
  t.after(() => {
    if (previousAdminEmail === undefined) delete process.env.ADMIN_EMAIL;
    else process.env.ADMIN_EMAIL = previousAdminEmail;
  });
  process.env.ADMIN_EMAIL = "operations@example.com";
  const calls = [];
  t.mock.method(emailService, "sendEmail", async (message) => {
    calls.push(message);
    return { data: { id: "test-email" } };
  });

  await emailService.sendAdminEmail({ subject: "Contact request", html: "<p>Test</p>" });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].to, "operations@example.com");
  assert.deepEqual(calls[0].cc, [ENGAGEMENTS_EMAIL]);

});

test("admin notifications avoid duplicate delivery when engagements is the admin recipient", async (t) => {
  const previousAdminEmail = process.env.ADMIN_EMAIL;
  t.after(() => {
    if (previousAdminEmail === undefined) delete process.env.ADMIN_EMAIL;
    else process.env.ADMIN_EMAIL = previousAdminEmail;
  });
  process.env.ADMIN_EMAIL = ENGAGEMENTS_EMAIL;
  const calls = [];
  t.mock.method(emailService, "sendEmail", async (message) => {
    calls.push(message);
    return { data: { id: "test-email" } };
  });

  await emailService.sendAdminEmail({ subject: "Contact request", html: "<p>Test</p>" });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].to, ENGAGEMENTS_EMAIL);
  assert.equal("cc" in calls[0], false);

});
