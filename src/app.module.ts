/**
 * @description:
 * @author:Hsj
 * @Date:2020-12-13 15:32:29
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import * as APP_CONFIG from './app.config';
import "./boilerplate.polyfill";
import { MONGO_DB_NAME as MONGO_DB_NAME, USER_DB_NAME } from './common/constants/module';
import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    WinstonModule.forRoot(APP_CONFIG.LOGGER.options),
    TypeOrmModule.forRoot({
      ...APP_CONFIG.MONGONDB.options,
      name: MONGO_DB_NAME,
      entities: [],
    }),
    TypeOrmModule.forRoot({
      ...APP_CONFIG.USERDB.options,
      name: USER_DB_NAME,
      entities: [User],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
