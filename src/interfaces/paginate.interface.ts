/**
 * @description:
 * @author:Hsj
 * @Date:2020-09-08 21:51:21
 */

import { ObjectLiteral } from 'typeorm';

export interface PaginateResult<T> {
  datas: T[];
  pageInfo: DataCount[];
}

export interface DataCount {
  count: number;
}

export interface QueryDto {
  getQuery(): ObjectLiteral;
}
