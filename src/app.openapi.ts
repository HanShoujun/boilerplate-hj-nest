/**
* @description:
* @author:Hsj
* @Date:2020-09-06 19:27:28
*/

import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
      .setTitle('接口文档')
      .setVersion('1.0')
      .setDescription(`
      管理后台接口都以"/admin/*"样式；
      客户端接口有以下规范：
      接口类型均为url；
      url区分大小写；
      如无特殊说明，url均为https加密访问；
      输出参数均为json格式字符串，json中的参数类型均为字符串类型；
      `)
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
}