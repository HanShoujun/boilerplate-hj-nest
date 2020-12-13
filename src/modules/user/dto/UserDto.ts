/**
* @description:
* @author:Hsj
* @Date:2020-10-16 13:48:41
*/

import { OutputDto } from "@app/common/dto/OutputDto";
import { Exclude, Transform } from "class-transformer";
import { User } from "../user.entity";


export class UserDto extends OutputDto implements User {
  userNumber: number;
  createTime: number;
  nickname: string;
  avatar: string;

  @Exclude()
  id: number;
  @Exclude()
  ipAddress: string;
}