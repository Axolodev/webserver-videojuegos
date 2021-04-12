// importar paquete de airtable

async function getScoreboard(req, reply) {
  return [];
}

async function updateScoreboard(req, reply) {
  return {
    response: 'updated',
  };
}

module.exports = {
  update: updateScoreboard,
  get: getScoreboard,
};
