const restify = require("restify");
const server = restify.createServer();

const cors = require("restify-cors-middleware")({
  preflightMaxAge: 5,
  origins: ["*"],
  allowHeaders: ["*", "token"],
  exposeHeaders: ["*", "token"],
});
server.pre(cors.preflight);
server.use(cors.actual);

const jsend = require("jsend");
server.use(jsend.middleware);
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

module.exports = server;
