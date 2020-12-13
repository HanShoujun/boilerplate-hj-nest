/**
 * @description:
 * @author:Hsj
 * @Date:2020-10-16 13:47:17
 */

import { QueryDto } from '@app/interfaces/paginate.interface';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ObjectLiteral } from 'typeorm';
import lodash from 'lodash';

export class UserQueryDto implements QueryDto {

  @IsOptional()
  @Type(()=>Number)
  date: number[];

  @IsOptional()
  @Type(()=>Number)
  userNumber: number;
  
  getQuery(): ObjectLiteral {
    const query = {};

    if (!lodash.isEmpty(this.date)) {
      Object.assign(query, {
        createTime: { $gte: this.date[0], $lt: this.date[1] },
      });
    }

    if (this.userNumber !== 0) {
      Object.assign(query, { userNumber: this.userNumber });
    }

    return query;
  }
}
