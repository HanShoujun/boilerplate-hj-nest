/**
 * @description:
 * @author:Hsj
 * @Date:2020-10-11 18:59:10
 */
import { USER_DB_NAME } from '@app/common/constants/module';
import { PageOptionsDto } from '@app/common/dto/PageOptionsDto';
import { PaginationResultDto } from '@app/common/dto/PaginationResultDto';
import { CustomException } from '@app/exceptions/custom.exception';
import { UtilsService } from '@app/providers/utils.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { AdminUser } from './admin/adminuser.entity';
import { AdminUserDto } from './dto/AdminUserDto';
import { UserDto } from './dto/UserDto';
import { UserQueryDto } from './dto/UserQueryDto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly admin: AdminUser;

  constructor(
    @InjectRepository(User, USER_DB_NAME)
    private usersRepository: Repository<User>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {
    // 初始化管理员
    this.admin = new AdminUser();
    this.admin.name = 'admin';
    this.admin.password =
      '123456';
    this.admin.avatar =
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';
    this.admin.roles = ['admin'];
  }

  async findAdmin(): Promise<AdminUserDto> {
    const dto = UtilsService.toDto(AdminUserDto, this.admin);
    return dto;
  }

  async findWithPageoptions(
    pageOptionsDto: PageOptionsDto,
    queryDto: UserQueryDto,
  ): Promise<PaginationResultDto<UserDto>> {
    const [datas, pageInfo] = await this.usersRepository.paginate(
      pageOptionsDto,
      queryDto.getQuery(),
    );
    const dtos = UtilsService.toDtos(UserDto, datas);
    return new PaginationResultDto(dtos, pageInfo);
  }

  async findWithId(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async findUserWithUserNumber(userNumber: number) {
    return await this.usersRepository.findOne({
      userNumber
    });
  }

  async changeAvatar(avatar: string, userId: number) {
    const user = await this.findWithId(userId);
    if (user == null) {
      throw new CustomException('没有此用户');
    }
    user.avatar = avatar;
    return await this.usersRepository.save(user);
  }

  async changeNickname(nickname: string, userId: number) {
    const user = await this.findWithId(userId);
    if (user == null) {
      throw new CustomException('没有此用户');
    }
    user.nickname = nickname;
    return await this.usersRepository.save(user);
  }

  private async createUserNumber() {

    let userNumber = this.randomNumber()
  
    while (await this.findUserWithUserNumber(userNumber)){
      this.logger.info(`随机用户编号：已经存在${userNumber}`);
      userNumber = this.randomNumber()
    }
    return userNumber
  }

  private randomNumber() {
    const random = Math.random(); //小于1的随机数
    const range = 10000000
    return 100000 + Math.round(random * range)
  }
}
