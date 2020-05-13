import 'reflect-metadata';
import { Request, Response } from 'express';
import { controller, get, post } from '../decorator';
import { getResponseData } from '../utils/utils';

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller('/api')
export class Login {
  static isLogin(req: BodyRequest): boolean {
    return !!(req.session ? req.session.login : false);
  }

  @get('/isLogin')
  isLogin(req: BodyRequest, res: Response): void {
    const isLogin = Login.isLogin(req);
    res.json(getResponseData(isLogin));
  }

  @post('/login')
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body;
    const isLogin = Login.isLogin(req);
    if (isLogin) {
      res.json(getResponseData(true));
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
}
