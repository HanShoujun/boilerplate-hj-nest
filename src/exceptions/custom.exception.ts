/**
* @description:
* @author:Hsj
* @Date:2020-09-06 18:56:28
*/

import { HttpException, HttpStatus } from '@nestjs/common';
import { TExceptionOption } from '@app/interfaces/http.interface';

/**
 * @class CustomException
 * @classdesc 默认 500 -> 服务端出错
 * @example new CustomException({ message: '错误信息' }, 400)
 * @example new CustomException({ message: '错误信息', error: new Error(xxx) })
 */
export class CustomException extends HttpException {
  constructor(options: TExceptionOption, statusCode?: HttpStatus) {
    super(options, statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}