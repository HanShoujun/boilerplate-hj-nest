/**
 * @description:
 * @author:Hsj
 * @Date:2020-09-08 22:37:30
 */

import { PageInfoDto } from './PageInfoDto';
import { OutputDto } from './OutputDto';

export class PaginationResultDto<T extends OutputDto> {
  datas: T[];
  pageInfo: PageInfoDto;
  constructor(datas: T[], pageInfo: PageInfoDto) {
    this.datas = datas;
    this.pageInfo = pageInfo;
  }
}
