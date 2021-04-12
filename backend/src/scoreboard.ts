import { FastifyRequest } from 'fastify';
import { puntosTable } from './utils';

type score = {
  id: number;
  name: string;
  score: number;
};

async function getScoreboard() {
  const scores: score[] = [];
  
  // 1. Obtener información de AirTable. Formatear según la estructura que necesitamos.
  await puntosTable
    .select({
      maxRecords: 20,
    })
    .eachPage((records, fetchNext) => {
      records.forEach((record) => {
        const { id, score, name } = record.fields;
        scores.push({
          id,
          score,
          name
        });
      });

      fetchNext();
    });

  // 2. Retornar puntuaciones nuevas.
  return scores;
}

async function updateScoreboard(req: FastifyRequest) {
  // 1. Obtener datos de body
  const { name, score } = req.body as {
    name: string;
    score: number;
  };

  // 2. Actualizar información en base de datos.
  await puntosTable.create({
    name,
    score,
  });

  // 3. Retornar información actualizada
  return {
    response: 'updated',
  };
}

module.exports = {
  update: updateScoreboard,
  get: getScoreboard,
};
