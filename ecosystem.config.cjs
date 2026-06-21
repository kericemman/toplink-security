const path = require("node:path");

module.exports = {
  apps: [
    {
      name: "toplink-api",
      cwd: path.join(__dirname, "backend"),
      script: "server.js",
      instances: Number(process.env.WEB_CONCURRENCY || 1),
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      wait_ready: true,
      listen_timeout: 15_000,
      kill_timeout: 15_000,
      time: true,
      merge_logs: true,
      env_production: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: 5000,
      },
    },
  ],
};
