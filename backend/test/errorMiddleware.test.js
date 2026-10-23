const test = require("node:test");
const assert = require("node:assert/strict");
const errorMiddleware = require("../src/middlewares/errorMiddleware");

test("Axios errors are logged without request config, credentials, or customer email", () => {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalConsoleError = console.error;
  const calls = [];
  process.env.NODE_ENV = "production";
  console.error = (...args) => calls.push(args);

  const error = Object.assign(new Error("Request failed with status code 400"), {
    name: "AxiosError",
    isAxiosError: true,
    code: "ERR_BAD_REQUEST",
    config: { headers: { Authorization: "Bearer sk_live_sensitive123" } },
    response: {
      status: 400,
      data: { message: "Invalid request for customer@example.test" },
    },
  });
  const response = {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };

  try {
    errorMiddleware(error, {}, response, assert.fail);
  } finally {
    console.error = originalConsoleError;
    if (originalNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalNodeEnv;
  }

  const logged = JSON.stringify(calls);
  assert.match(logged, /upstreamStatus/);
  assert.doesNotMatch(logged, /sk_live_sensitive123|customer@example\.test|Authorization|config/);
  assert.equal(response.statusCode, 500);
});
