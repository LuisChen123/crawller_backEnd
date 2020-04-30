import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controller/login';
import './controller/crowllerController';
import router from './router';

const port = 7001;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cookieSession({
    name: 'session',
    keys: ['luis'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  req.name = 'luis';
  next();
});
app.use(router);
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
