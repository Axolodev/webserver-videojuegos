const fastify = require("fastify");
const app = fastify();

const scoreboardRoutes = require('./scoreboard');

app.get('/scoreboard', scoreboardRoutes.get);
app.post("/scoreboard", scoreboardRoutes.update)

module.exports = app;