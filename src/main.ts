/**
* @description:
* @author:Hsj
* @Date:2020-12-13 15:32:29
*/


import * as APP_CONFIG from '@app/app.config';
import { isDevMode } from '@app/app.environment';
import { setupSwagger } from '@app/app.openapi';
import { HttpExceptionFilter } from '@app/filters/error.filter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import bodyParser from 'body-parser';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 日志
  const appLogger = app.get<WinstonLogger>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(appLogger);
  // 跨域
  app.enableCors();
  // 安全
  app.use(helmet());
  // 压缩
  app.use(compression());
  // 解析
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  // 限制频率
  app.use(rateLimit({ max: 1000, windowMs: 15 * 60 * 1000 }));

  // 异常处理
  app.useGlobalFilters(new HttpExceptionFilter(appLogger));

  // 验证
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      validationError: {
        target: true,
      },
    }),
  );

  // 序列化
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(reflector),
    new LoggingInterceptor(appLogger),
  );

  if (isDevMode) {
    setupSwagger(app);
  }

  await app.listen(APP_CONFIG.APP.PORT);
}
bootstrap();
