import * as bodyParser from 'body-parser';
import express, {Request, Response} from 'express';
import {GraphQLSchema} from 'graphql';
import ExpressGraphQL from 'express-graphql';
import path from 'path';
import Chalk from 'chalk';
import DB from './db/DB';
import schemaBuilder from './graphql/schema';
import personMiddleWare from './middleware/person';
import {DecryptablePerson} from "./graphql/resolvers/Person";

const APP_SECRET = process.env.APP_SECRET || '';
const basePath: string = path.resolve(__dirname, '../../');
const indexHtml: string = path.resolve(basePath, 'dist/index.html');

export interface AppContext {
  APP_SECRET: string;
  user?: DecryptablePerson;
}

class App {
  public express: express.Application;
  private db: DB;

  constructor() {
    this.express = express();
    this.db = DB.getInstance();
    this.mountRoutes();
  }

  private async mountRoutes(): Promise<void> {
    const router = express.Router();
    let exp = this.express;
    exp.use(bodyParser.json());
    exp.use(personMiddleWare(APP_SECRET));
    router.get('/', (req: Request, res: Response) => {
      res.sendFile(indexHtml);
    });
    try {
      const schema: GraphQLSchema = await schemaBuilder();
      exp.use('/', router);
      exp.use('/dist', express.static('dist'));
      exp.use('/assets', express.static('assets'));
      exp.use('/graphql', bodyParser.json(), ExpressGraphQL((req: Request) => ({
        schema,
        graphiql: true,
        context: {
          user: (req as any).user,
          APP_SECRET,
        } as AppContext,
      })));
    }
    catch (e) {
      console.log(Chalk.red('Could not build graphql schema'));
      console.log(Chalk.red(e));
      process.exit(1);
    }
  }
}

export default new App().express;
