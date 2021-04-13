import * as React from 'react';
import {
  Box,
  Button,
  Grommet,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  TextInput,
} from 'grommet';
import 'regenerator-runtime/runtime';
import { hpe } from 'grommet-theme-hpe';

type ScoreboardScore = {
  id: number;
  name: string;
  score: number;
};

type Score = {
  name: string;
  score: number;
};

const basePath = 'http://localhost:3000';

async function requestScores() {
  const route = `${basePath}/scoreboard`;
  const response = await fetch(route, {
    method: 'GET',
  });

  const data: ScoreboardScore[] = await response.json();
  return data;
}

async function submitScore(params: Score) {
  const route = `${basePath}/scoreboard`;
  const response = await fetch(route, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  return data;
}

function App() {
  const [scores, setScores] = React.useState<ScoreboardScore[]>([]);

  async function updateLocalScores() {
    const scores = await requestScores();
    setScores(scores);
  }

  async function addScore(score: Score) {
    await submitScore(score);
    await updateLocalScores();
  }

  React.useEffect(() => {
    // React no permite funciones asíncronas en la raíz de nuestros useEffect,
    // por lo que no es posible crear un "useEffect(async () => {})"
    // Para esto, necesitamos crear una función async y usarla para llamar
    // la función requestScores.
    updateLocalScores();
  }, []);

  return (
    <Grommet theme={hpe}>
      <Box
        width={{ max: '300px' }}
        margin={{ horizontal: 'auto' }}
        direction="column"
        pad="medium"
        gap="medium"
      >
        <Box width="full">
          <AddScoreForm addScore={addScore} />
        </Box>
        <Box width="full">
          <TableRenderer scores={scores} />
        </Box>
      </Box>
    </Grommet>
  );
}

const TableRenderer: React.FunctionComponent<{
  scores: ScoreboardScore[];
}> = ({ scores }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom" pad={{ right: 'large' }}>
            <Text weight="bold" size="2">
              Nombre
            </Text>
          </TableCell>
          <TableCell scope="col" border="bottom">
            <Text weight="bold" size="2">
              Puntuación
            </Text>
          </TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores?.map((score) => (
          <TableRow key={score.id}>
            <TableCell scope="row">{score.name}</TableCell>
            {/* @ts-ignore */}
            <TableCell scope="row" align="right">
              {score.score}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const AddScoreForm: React.FunctionComponent<{
  addScore: (score: Score) => Promise<void>;
}> = ({ addScore }) => {
  const [name, setName] = React.useState('');
  const [score, setScore] = React.useState(0);

  // Normalmente el manejo de errores se hace con una librería adicional.
  const [nameError, setNameError] = React.useState('');
  const [scoreError, setScoreError] = React.useState('');

  async function validateForm() {
    let hasError = false;
    if (name === '') {
      setNameError('El campo de nombre necesita un valor.');
      hasError = true;
    }
    if (score < 1) {
      setScoreError('El campo de puntos necesita un valor.');
      hasError = true;
    }
    if (hasError) return;

    try {
      await addScore({
        name,
        score,
      });
      setName('');
      setScore(0);
    } catch (exception) {
      alert('Hubo un error al enviar los datos.');
      console.error(exception);
    }
  }

  return (
    <Box gap="small">
      <label htmlFor="name">
        <Text weight="bold" size="small">
          Nombre
        </Text>
      </label>
      <TextInput
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value.trim())}
      />
      {nameError.length > 0 && (
        <Text size="small" color="status-critical">
          {nameError}
        </Text>
      )}
      <label htmlFor="score">
        <Text weight="bold" size="small">
          Puntos
        </Text>
      </label>
      <TextInput
        id="score"
        value={score}
        onChange={(event) => {
          const { value } = event.target;
          const reg = /^\d+$/;
          // Se borró el valor del input
          if (!value) {
            setScore(0);
            return;
          }
          // Validar que sea valor numérico
          if (reg.test(value)) {
            setScore(Number(value));
          }
        }}
      />
      {scoreError.length > 0 && (
        <Text size="small" color="status-critical">
          {scoreError}
        </Text>
      )}
      <Button label="Agregar" color="brand" primary onClick={validateForm} />
    </Box>
  );
};

export default App;
