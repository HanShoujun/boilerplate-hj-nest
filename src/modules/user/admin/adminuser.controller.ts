/**
 * @description:
 * @author:Hsj
 * @Date:2020-10-09 16:38:15
 */

import { AuthUser } from '@app/decorators/auth-user.decorator';
import { AdminauthGuard } from '@app/guards/adminauth.guard';
import { UtilsService } from '@app/providers/utils.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AdminUser } from './adminuser.entity';
import { AdminUserDto } from '../dto/AdminUserDto';
import { UserService } from '../user.service';
import { PageOptionsDto } from '@app/common/dto/PageOptionsDto';
import { UserQueryDto } from '../dto/UserQueryDto';
import { CustomException } from '@app/exceptions/custom.exception';
import { UserDto } from '../dto/UserDto';
import { User } from '../user.entity';

@UseGuards(AdminauthGuard)
@Controller('admin/users')
export class AdminuserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(
    @Query()
    pageOptionsDto: PageOptionsDto,
    @Query()
    queryDto: UserQueryDto,
  ) {
    return await this.userService.findWithPageoptions(pageOptionsDto, queryDto);
  }

  @Get('detail/:id')
  async getUser(@Param('id') id: number): Promise<UserDto>{
    const user = await this.userService.findWithId(id);
    if (!user) {
      throw new CustomException('没有此数据');
    }
    return UtilsService.toDto(UserDto, user);
  }
  
  @Get('me')
  async getAdminUser(@AuthUser() adminuser: AdminUser): Promise<AdminUserDto> {
    return UtilsService.toDto(AdminUserDto, adminuser);
  }
}
