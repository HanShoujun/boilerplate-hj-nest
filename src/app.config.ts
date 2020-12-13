/**
 * @description:
 * @author:Hsj
 * @Date:2020-09-05 19:23:43
 */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { format, LoggerOptions, transports } from 'winston';
import 'winston-daily-rotate-file';

process.env.NODE_ENV = process.env.NODE_ENV || "development"

const envFound = dotenv.config()
if (!envFound) {
  throw new Error("Couldn`t find .env file");
}

export const APP = {
  PORT: +(process.env.PORT || '8888'),
};

export const AUTH = {
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
  expiresIn: 60*60*24*7,
  payload: { name: 'admin' },
};

const appLoggerOptions: LoggerOptions = {
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json(),
    // utilities.format.nestLike(),
  ),
  transports: [
    new transports.Console({
      level: 'debug',
    }),
    new transports.DailyRotateFile({
      filename: 'server%DATE%.log',
      datePattern: 'YYYYMMDD',
      dirname: `${process.env.LOGGER_PATH || '.'}/logs`,
      maxSize: '20m',
      level: 'debug',
    }),
  ],
};
export const LOGGER = { options: appLoggerOptions };

const mongodbDBOptions: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.MONGONDBURL || 'mongodb://localhost',
  authSource: process.env.AUTHSOURCE || 'admin',
  database: 'hjbookstore',
  replicaSet: process.env.MONGONDBREPLICASET || '',
  synchronize: true,
  logging: false,
  useUnifiedTopology: true,
};
export const MONGONDB = {
  options: mongodbDBOptions
};

const userOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.USERAPP_DBHOST || 'localhost',
  port: +(process.env.USERAPP_DBPORT || '3306'),
  database: 'bookapp',
  username: process.env.USERAPP_USERNAME || 'username',
  password: process.env.USERAPP_PASSWORD || 'password',
  synchronize: true,
  logging: false,
};
export const USERDB = {
  options: userOptions
};
