import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import {DecryptablePerson} from "../graphql/resolvers/Person";

export default function addThePersonMiddleWare(SECRET: string): (r1: Request, r2: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string | string[] | undefined = req.headers.authorization;
    if (typeof token !== 'string') {
      next();
    }
    else {
      try {
        console.log(chalk.green('personMiddleware, token: ' + token));
        console.log(chalk.green('personMiddleware, SECRET: ' + SECRET));
        const user: DecryptablePerson = await jwt.verify(token, SECRET) as DecryptablePerson;
        (req as any).user = user;
        next();
      }
      catch (e) {
        console.warn(chalk.yellow('PersonMiddleware:: error'));
        console.warn(chalk.yellow(e));
        res
          .status(500)
          .send(e);
      }
    }
  }
};
