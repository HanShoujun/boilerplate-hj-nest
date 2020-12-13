/**
* @description:
* @author:Hsj
* @Date:2020-12-07 20:57:33
*/

import { IsNotEmpty } from "class-validator";

export class ChangeNickNameDto {

  @IsNotEmpty({ message: '昵称？' })
  nickname: string;

}