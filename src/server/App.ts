import * as bodyParser from 'body-parser';
import express, {Request, Response} from 'express';
import {GraphQLSchema} from 'graphql';
import ExpressGraphQL from 'express-graphql';
import path from 'path';
import Chalk from 'chalk';
import DB from './db/DB';
import schemaBuilder from './graphql/schema';

const basePath: string = path.resolve(__dirname, '../../');
const indexHtml: string = path.resolve(basePath, 'dist/index.html');

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
    this.express.use(bodyParser.json());
    router.get('/', (req: Request, res: Response) => {
      res.sendFile(indexHtml);
    });
    try {
      const schema: GraphQLSchema = await schemaBuilder();
      this.express.use('/', router);
      this.express.use('/dist', express.static('dist'));
      this.express.use('/assets', express.static('assets'));
      this.express.use('/graphql', ExpressGraphQL({
        schema,
        graphiql: true,
      }));
    }
    catch (e) {
      console.log(Chalk.red('Could not build graphql schema'));
      console.log(Chalk.red(e));
      process.exit(1);
    }
  }

  private async getDBConnection() {
    console.log('app:getDBConnection');
    try {
      const conn = await this.db.getConnection();
      console.log('app:getDBConnection:success');
    }
    catch (e) {
      console.log('app:getDBConnection:erraor');
      console.log(e);
    }
  }
}

export default new App().express;
