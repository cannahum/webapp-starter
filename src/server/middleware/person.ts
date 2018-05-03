import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import {IDecryptablePerson} from '../graphql/resolvers/Person';

export default function addThePersonMiddleWare(SECRET: string):
  (r1: Request, r2: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token: string | string[] | undefined = req.headers.authorization;
    if (typeof token !== 'string') {
      next();
    }
    else {
      try {
        console.log(chalk.green('personMiddleware, token: ' + token));
        console.log(chalk.green('personMiddleware, SECRET: ' + SECRET));
        (req as any).user = jwt.verify(token, SECRET) as IDecryptablePerson;
        next();
      }
      catch (e) {
        console.warn(chalk.yellow('PersonMiddleware:: error'));
        console.warn(chalk.yellow(e));
        res
          .status(400)
          .send(e);
      }
    }
  };
}
