/**
 * @description:
 * @author:Hsj
 * @Date:2020-10-11 18:59:16
 */
import { AuthUser } from '@app/decorators/auth-user.decorator';
import { JwtAuthGuard } from '@app/guards/auth.guard';
import { UtilsService } from '@app/providers/utils.service';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ChangeNickNameDto } from './dto/ChangeNickNameDto';
import { UserDto } from './dto/UserDto';
import { User } from './user.entity';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getUser(@AuthUser() user: User): Promise<UserDto> {
    return UtilsService.toDto(UserDto, user);
  }

  @Patch('nickname')
  async changeNickname(@Body() dto: ChangeNickNameDto, @AuthUser() user: User) {
    const nickname = dto.nickname;

    user = await this.userService.changeNickname(nickname, user.id);
    return UtilsService.toDto(UserDto, user);
  }
}
