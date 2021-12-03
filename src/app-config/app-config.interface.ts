import { Dialect } from 'sequelize/types';

export interface IDatabase {
  name: string;
  dialect: Dialect;
  username: string;
  password: string;
  pool?: {
    min: number;
    max: number;
  };
}
export interface IServer {
  port: number;
}
export interface IAppConfig {
  database: IDatabase;
  server: IServer;
}
