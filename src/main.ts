import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {logger:['debug']});
  app.useStaticAssets(join(__dirname, '..','static'));
  console.log(`puerto ------------> ${process.env.PORT || 3000 }`);
  await app.listen(process.env.PORT || 3000 );
}
bootstrap();