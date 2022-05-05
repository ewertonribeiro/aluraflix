/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const URI = 'http://user-service:5000/session/check';

class Auth {
  async token(req: Request, res: Response, next: NextFunction) {
    const bearer = req.headers.authorization;
    const token = bearer.split(' ');

    try {
      await axios.get(URI, {
        headers: {
          authorization: `Bearer ${token[1]}`,
        },
      });

      return next();
    } catch (err) {
      return res.status(400).json({
        erro: err.message,
        message: 'credenciais Invalidas!',
      });
    }
  }
}

export default Auth;
