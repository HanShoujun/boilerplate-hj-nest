/**
 * @description:
 * @author:Hsj
 * @Date:2020-10-11 18:55:58
 */

import { USER_DB_NAME } from '@app/common/constants/module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminuserController } from './admin/adminuser.controller';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User], USER_DB_NAME)],
  controllers: [UserController, AdminuserController],
  providers: [UserService],
  exports: [ UserService],
})
export class UserModule {}
