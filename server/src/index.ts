import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import errorHandling from './middleware/errorHandling.js';

const app = express();

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use(express.json());

app.use(errorHandling);

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${process.env.PORT}`);
});
