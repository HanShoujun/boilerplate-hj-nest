/**
* @description:
* @author:Hsj
* @Date:2020-10-31 12:11:47
*/

import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validateOrReject } from 'class-validator';
import { transformAndValidate } from 'class-transformer-validator';

export const RequestHeader = createParamDecorator(
  async (value:  ClassType<Object>, ctx: ExecutionContext) => {

    // extract headers
    const headers = ctx.switchToHttp().getRequest().headers;

    // Convert headers to DTO object
    // Validate 
    try {
      const dto = transformAndValidate(value, headers);
      // return header dto object 
      return dto;
    } catch (error) {
      throw new BadRequestException("Header无效");
    }
  },
);
