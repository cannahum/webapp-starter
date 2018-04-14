import {Connection, createConnection} from 'typeorm';
import {default as CONNECTION_OPTIONS_DEV} from './ormconfig.dev';

/**
 *
 */
export default class DB {

  // Static Methods & Fields
  public static getInstance() {
    if (DB.instance) {
      return DB.instance;
    }
    const db = new DB();
    DB.instance = db;
    return db;
  }

  private static instance?: DB;

  // Instance Methods & Fields
  private connection?: Connection;

  public async getConnection(): Promise<Connection> {
    if (this.connection instanceof Connection) {
      return this.connection;
    }
    return this.createConnection();
  }

  // Throws errors
  private async createConnection(): Promise<Connection> {
    this.connection = await createConnection(CONNECTION_OPTIONS_DEV);
    return this.connection;
  }
}
