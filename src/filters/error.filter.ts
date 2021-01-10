/**
 * @description:
 * @author:Hsj
 * @Date:2020-09-05 19:55:01
 */

import { isDevMode } from '@app/app.environment';
import {
  EHttpStatus,
  TExceptionOption,
  THttpErrorResponse,
  TMessage,
} from '@app/interfaces/http.interface';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import lodash from 'lodash';
import { WinstonLogger } from 'nest-winston';

/**
 * @description 拦截全局抛出的Http异常，同时任何错误将在这里被规范化输出 THttpErrorResponse
 * @export
 * @class HttpExceptionFilter
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: WinstonLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    // 来源 IP
    let ip = (
      request.headers['x-forwarded-for'] ||
      request.headers['x-real-ip'] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      request.ip ||
      request.ips[0]
    );
    if (typeof ip === 'object') {
      ip = ip[0].replace('::ffff:', '');
    }else {
      ip = ip.replace('::ffff:', '')
    }
    (exception as any).ip = ip
    this.logger.error(exception);
    const response = host.switchToHttp().getResponse<Response>();
    try {
      const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
      const errorOption: TExceptionOption = exception.getResponse() as TExceptionOption;

      const isString = (value: TExceptionOption): value is TMessage =>
        lodash.isString(value);
      const errMessage = isString(errorOption)
        ? errorOption
        : errorOption.message;
      const errorInfo = isString(errorOption) ? null : errorOption.error;
      const parentErrorInfo = errorInfo ? String(errorInfo) : null;
      const isChildrenError =
        errorInfo && errorInfo.status && errorInfo.message;
      const resultError =
        (isChildrenError && errorInfo.message) || parentErrorInfo;
      const resultStatus = isChildrenError ? errorInfo.status : status;

      const data: THttpErrorResponse = {
        status: EHttpStatus.Error,
        message: errMessage,
        error: resultError,
        debug: isDevMode ? exception.stack : undefined,
      };

      if (status === HttpStatus.NOT_FOUND) {
        data.error = '资源不存在';
        data.message = `接口 ${request.method} -> ${request.url} 无效`;
      }

      response.status(resultStatus).json(data);
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
