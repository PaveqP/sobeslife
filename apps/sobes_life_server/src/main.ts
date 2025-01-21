import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { router as authRouter } from '@sobes-life-server/auth';
import { router as testRouter } from '@sobes-life-server/tests';

dotenv.config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/test', testRouter);

app.get('/', (req, res) => {
  res.send({ message: 'Hello API!!!!' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
