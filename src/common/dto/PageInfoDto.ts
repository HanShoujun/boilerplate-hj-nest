/**
* @description:
* @author:Hsj
* @Date:2020-09-08 13:06:06
*/
import { ApiProperty } from '@nestjs/swagger';

interface IPageInfoDtoParameters {
    page: number;
    pageSize: number;
    total: number;
}

export class PageInfoDto {
    @ApiProperty()
    readonly page: number;

    @ApiProperty()
    readonly pageSize: number;

    @ApiProperty()
    readonly total: number;

    constructor({ page,pageSize, total }: IPageInfoDtoParameters) {
        this.page = page;
        this.pageSize = pageSize;
        this.total = total;
    }
}
