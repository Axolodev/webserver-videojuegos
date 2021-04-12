const fastify = require('fastify');
const server = fastify();

const scoreboardRoutes = require('./scoreboard');

server.get('/scoreboard', scoreboardRoutes.get);
server.put('/scoreboard', scoreboardRoutes.update);

module.exports = server;
