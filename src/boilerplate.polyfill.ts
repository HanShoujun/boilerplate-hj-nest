/**
 * @description:
 * @author:Hsj
 * @Date:2020-09-08 21:39:41
 */

import { PageInfoDto } from '@app/common/dto/PageInfoDto';
import { PageOptionsDto } from '@app/common/dto/PageOptionsDto';
import {
  MongoRepository,
  ObjectLiteral,
  Repository
} from 'typeorm';
import { PaginateResult } from './interfaces/paginate.interface';

declare module 'typeorm' {
  interface MongoRepository<Entity> {
    paginate(
      this: MongoRepository<Entity>,
      pageOptionsDto: PageOptionsDto,
      query: ObjectLiteral,
    ): Promise<[Entity[], PageInfoDto]>;
  }

  interface Repository<Entity> {
    paginate(
      this: Repository<Entity>,
      pageOptionsDto: PageOptionsDto,
      query: ObjectLiteral,
    ): Promise<[Entity[], PageInfoDto]>;
  }
}

MongoRepository.prototype.paginate = async function<Entity>(
  this: MongoRepository<Entity>,
  pageOptionsDto: PageOptionsDto,
  query: ObjectLiteral,
): Promise<[Entity[], PageInfoDto]> {
  const result = await this.aggregate<PaginateResult<Entity>>(
    [
      { $match: query },
      {
        $facet: {
          datas: [
            { $sort: pageOptionsDto.getSort() },
            { $skip: pageOptionsDto.skip },
            { $limit: pageOptionsDto.pageSize },
          ],
          pageInfo: [{ $group: { _id: null, count: { $sum: 1 } } }],
        },
      },
    ],
    {
      allowDiskUse: true,
    },
  ).toArray();

  const paginateResult = result.shift();
  const total = paginateResult?.pageInfo.shift()?.count || 0;
  const pageInfoDto = new PageInfoDto({
    total,
    page: pageOptionsDto.page,
    pageSize: pageOptionsDto.pageSize,
  });
  const datas = paginateResult?.datas || [];
  return [datas, pageInfoDto];
};

Repository.prototype.paginate = async function<Entity>(
  this: Repository<Entity>,
  pageOptionsDto: PageOptionsDto,
  query: ObjectLiteral,
): Promise<[Entity[], PageInfoDto]> {
  const [items, total] = await this.findAndCount({
    where: query,
    order: pageOptionsDto.getOrder(),
    take: pageOptionsDto.pageSize,
    skip: pageOptionsDto.skip,
  });

  const pageInfoDto = new PageInfoDto({
    total,
    page: pageOptionsDto.page,
    pageSize: pageOptionsDto.pageSize,
  });

  return [items, pageInfoDto];
};
