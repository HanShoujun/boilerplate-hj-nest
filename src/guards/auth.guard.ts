import { ClientGuardName } from '@app/common/constants/module';
/**
* @description:
* @author:Hsj
* @Date:2020-09-10 15:46:26
*/

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard(ClientGuardName) {}
