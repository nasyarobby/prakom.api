require("dotenv").config();
const jwt = require("jsonwebtoken");

const APP_CONFIG = {
  PORT: process.env.APP_SERVER_PORT || 8181,
  LOG_OUTPUT: process.env.APP_LOG_OUTPUT || "CONSOLE",
  JWT_TOKEN: process.env.JWT_TOKEN || "simplesso",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "2h",
};

const log =
  APP_CONFIG.LOG_OUTPUT === "CONSOLE"
    ? require("./Logger").ConsoleLogger
    : require("./Logger").RollingFileLogger;

const server = require("./Server");
const routes = require("./routes");

server.get("/", (req, res, next) => {
  res.send("Server is up and running.");
  next(false);
});

routes(server);

server.listen(APP_CONFIG.PORT, (err) => {
  if (err) {
    log.error(err.message);
    process.exit(1);
  }

  log.info("Server is running on port ", APP_CONFIG.PORT);
});
