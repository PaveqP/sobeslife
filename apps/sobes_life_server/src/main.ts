import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRouter from './routes/user-routes';
import authRouter from './routes/auth-routes';

dotenv.config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send({ message: 'Hello API!!!!' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
