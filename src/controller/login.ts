import 'reflect-metadata';
import { Request, Response } from 'express';
import { controller, get, post } from '../decorator';
import { getResponseData } from '../utils/utils';

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller('/')
export class Login {
  static isLogin(req: BodyRequest): boolean {
    return !!(req.session ? req.session.login : false);
  }

  @get('/api/isLogin')
  isLogin(req: BodyRequest, res: Response): void {
    const isLogin = Login.isLogin(req);
    res.json(getResponseData(isLogin));
  }

  @post('/login')
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body;
    const isLogin = Login.isLogin(req);
    if (isLogin) {
      res.json(getResponseData(false, 'already login'));
    } else {
      if (password === '123' && req.session) {
        req.session.login = true;
        res.json(getResponseData(true));
      } else {
        res.json(getResponseData(false, 'password is not correct'));
      }
    }
  }

  @get('/logout')
  logout(req: BodyRequest, res: Response): void {
    if (req.session) {
      req.session.login = false;
    }
    res.json(getResponseData(true));
  }

  @get('/')
  home(req: BodyRequest, res: Response): void {
    const isLogin = Login.isLogin(req);
    if (isLogin) {
      res.send(`
    <html>
    <body>
      <a href='/getData'>get some data</a>
      <a href='/showData'>show me the the data</a>
      <a href='/logout'>log out</a>
    </body>
    </html>
    `);
    } else {
      res.send(`
    <html>
    <body>
      <form method = "post" action="/login">
      <input type="password" name ="password" /> 
      <button>submit</button>
      </form>
    </body>
    </html>
    `);
    }
  }
}
