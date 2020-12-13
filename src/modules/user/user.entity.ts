/**
 * @description:
 * @author:Hsj
 * @Date:2020-10-11 19:01:11
 */

import { MysqlBaseEntity } from '@app/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends MysqlBaseEntity {

  // 用户编号
  @Column('bigint',{ unique: true })
  userNumber: number;
  
  @Column({ unique: true })
  nickname: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  ipAddress: string;
}
