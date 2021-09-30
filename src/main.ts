import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {logger:['debug']});
  app.useStaticAssets(join(__dirname, '..','static'));
  console.log(`puerto ------------> ${process.env.PORT || 3000 }`);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Websocket api example')
    .setDescription('app socket hamilton-murphy')
    .setVersion('1.0')
    .addTag('socket')
    .build();
  
    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000 );
}
bootstrap();
