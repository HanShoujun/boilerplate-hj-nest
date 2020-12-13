/**
 * @description:
 * @author:Hsj
 * @Date:2020-09-06 17:17:28
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WinstonLogger } from 'nest-winston';
import { Request, Response } from 'express';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: WinstonLogger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const call$ = next.handle();

    const request = context.switchToHttp().getRequest<Request>();
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

    const { originalUrl, method, params, query, body, headers } = request;
    const input = Object.assign({}, params, query, body, headers);
    const now = Date.now();

    return call$.pipe(
      tap(data => {
        const response = context.switchToHttp().getResponse<Response>();
        const logMsg = {
          ip,
          originalUrl,
          method,
          input,
          statusCode: response.statusCode,
          delay: `${Date.now() - now}ms`,
        };
        this.logger.log(logMsg);
      }),
      catchError(error => {
        const logMsg = {
          ip,
          originalUrl,
          method,
          input,
          error,
          delay: `${Date.now() - now}ms`,
        };
        this.logger.error(logMsg);
        return throwError(error);
      }),
    );
  }
}
