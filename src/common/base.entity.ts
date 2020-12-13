/**
 * @description:
 * @author:Hsj
 * @Date:2020-09-08 13:06:06
 */

import { Column, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

export class BaseEntity {
  @Column('bigint')
  createTime: number = Date.now();
}

export class MongoBaseEntity extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;
}

export class MysqlBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
