import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AtGuard } from './auth/common/guards';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  app.useGlobalPipes(new ValidationPipe); 
  const reflector = new Reflector()
  app.useGlobalGuards(new AtGuard(reflector))
  app.use(helmet());
  await app.listen(8000);
}
bootstrap();
