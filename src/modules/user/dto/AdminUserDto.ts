/**
 * @description:
 * @author:Hsj
 * @Date:2020-09-10 09:28:26
 */

import { OutputDto } from '@app/common/dto/OutputDto';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { AdminUser } from '../admin/adminuser.entity';

export class AdminUserDto extends OutputDto implements AdminUser {
  @IsOptional()
  name: string;

  @Exclude()
  password: string;

  @IsOptional()
  roles: string[];
  @IsOptional()
  avatar: string;
}
