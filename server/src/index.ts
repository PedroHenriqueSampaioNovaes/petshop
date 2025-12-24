import 'dotenv/config';
import express from 'express';
const app = express();

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${process.env.PORT}`);
});
