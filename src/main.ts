import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IAppConfig, IServer } from './app-config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const configService = app.get<ConfigService<IAppConfig>>(ConfigService);
  const serverConfig = configService.get<IServer>('server');
  await app.listen(serverConfig.port, () => {
    console.log('App is running on port: ', serverConfig.port);
  });
}
bootstrap();
