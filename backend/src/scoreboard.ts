import { FastifyRequest } from 'fastify';

type score = {
  id: number;
  name: string;
  score: number;
};

const scoreboards: score[] = [];

async function getScoreboard() {
  // 1. Obtener información de AirTable. Formatear según la estructura que necesitamos.
  const scores = scoreboards;

  // 2. Retornar puntuaciones nuevas.
  return scores;
}

async function updateScoreboard(req: FastifyRequest) {
  // 1. Obtener datos de body
  const body = req.body as {
    name: string;
    score: number;
  };

  // 2. Actualizar información en AirTable. Validar errores con try/catch?
  scoreboards.push({
    id: scoreboards.length + 1,
    name: body.name,
    score: body.score,
  });

  // 3. Retornar información actualizada
  return {
    response: 'updated',
    result: scoreboards,
  };
}

module.exports = {
  update: updateScoreboard,
  get: getScoreboard,
};
