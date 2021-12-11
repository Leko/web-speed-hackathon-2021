import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';
import compression from 'compression';
import cors from 'cors';

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';

function redisStore() {
  const redis = require('redis');

  let RedisStore = require('connect-redis')(session);
  let redisClient = redis.createClient({ url: process.env.REDIS_URL });

  return new RedisStore({ client: redisClient });
}

const app = Express();

app.set('trust proxy', true);

app.use(cors());
app.use(compression());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    ...(process.env.REDIS_URL ? { store: redisStore() } : { proxy: true }),
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '10mb' }));

app.use('/api/v1', apiRouter);
app.use(staticRouter);

export { app };
