const fastify = require('fastify');
const fastifycors = require('fastify-cors');
const server = fastify();
// Necesitamos permitir hacer peticiones Cross-origin, por lo que hay que habilitar CORS.
server.register(fastifycors);

const scoreboardRoutes = require('./scoreboard');

server.get('/scoreboard', scoreboardRoutes.get);
server.put('/scoreboard', scoreboardRoutes.update);

module.exports = server;
