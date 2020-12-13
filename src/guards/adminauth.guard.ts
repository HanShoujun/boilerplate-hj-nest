import { AdminGuardName } from '@app/common/constants/module';
/**
 * @description:
 * @author:Hsj
 * @Date:2020-10-10 13:20:46
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminauthGuard extends AuthGuard(AdminGuardName) {}
