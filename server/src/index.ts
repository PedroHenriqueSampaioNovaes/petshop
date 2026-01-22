import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import errorHandling from './middleware/errorHandling.js';

import routesPromisse from './routes/index.js';

const app = express();

app.use(cors({ origin: process.env.WEBSITE_URL }));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use(express.json());

async function loadRoutes() {
  const routes = await routesPromisse;
  routes.forEach(({ baseURL, router }) => {
    app.use(`/api${baseURL}`, router);
  });
}
await loadRoutes();

app.use(errorHandling);

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${process.env.PORT}`);
});
