/**
 * @description:
 * @author:Hsj
 * @Date:2020-09-08 13:06:06
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Order } from '../constants/order';

export class PageOptionsDto {
  @ApiPropertyOptional({
    enum: Order,
    default: Order.DESC,
  })
  @Type(() => Number)
  @IsEnum(Order, { message: '排序字段不正确（必须是1或-1）' })
  @IsOptional()
  readonly order: Order = Order.DESC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 100,
    default: 20,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  readonly pageSize: number = 20;

  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  readonly sort?: string;

  getSort() {
    if (this.sort == null) {
      return { _id: this.order };
    } else {
      return {
        [this.sort]: this.order,
      };
    }
  }

  getOrder() {
    if (this.sort == null) {
      return { id: this.order };
    } else {
      return {
        [this.sort]: this.order,
      };
    }
  }
}
