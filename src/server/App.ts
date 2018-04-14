import * as bodyParser from 'body-parser';
import express, {Request, Response} from 'express';
import path from 'path';
import DB from './db/DB';

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

  private mountRoutes(): void {
    const router = express.Router();
    this.express.use(bodyParser.json());
    router.get('/', (req: Request, res: Response) => {
      res.sendFile(indexHtml);
    });
    this.express.use('/', router);
    this.express.use('/dist', express.static('dist'));
    this.express.use('/assets', express.static('assets'));

    // Test
    this.getDBConnection();
  }

  private async getDBConnection() {
    console.log('app:getDBConnection');
    try {
      const conn = await this.db.getConnection();
      console.log('app:getDBConnection:success');
      console.log(conn);
    }
    catch (e) {
      console.log('app:getDBConnection:error');
      console.log(e);
    }
  }
}

export default new App().express;
