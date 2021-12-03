import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IAppConfig, IServer } from './app-config';
import { ValidationPipe } from '@nestjs/common';
import { CrudConfigService } from '@nestjsx/crud';
import { CrudWrapperInterceptor, LocalizationSetter } from './shared';

CrudConfigService.load({
  serialize: {
    get: false,
    getMany: false,
    create: false,
    createMany: false,
    update: false,
    replace: false,
    delete: false,
  },
  query: {
    limit: 15,
    maxLimit: 100,
    alwaysPaginate: true,
  },
  auth: {
    property: 'user',
  },
  routes: {
    exclude: ['deleteOneBase', 'createManyBase', 'replaceOneBase'],
    getOneBase: {
      interceptors: [CrudWrapperInterceptor],
    },
    getManyBase: {
      interceptors: [CrudWrapperInterceptor],
    },
    createOneBase: {
      interceptors: [CrudWrapperInterceptor],
    },
    createManyBase: {
      interceptors: [CrudWrapperInterceptor],
    },
    updateOneBase: {
      interceptors: [CrudWrapperInterceptor],
    },
    replaceOneBase: {
      interceptors: [CrudWrapperInterceptor],
    },
  },
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(new LocalizationSetter());
  const configService = app.get<ConfigService<IAppConfig>>(ConfigService);
  const serverConfig = configService.get<IServer>('server');
  await app.listen(serverConfig.port, () => {
    console.log('App is running on port: ', serverConfig.port);
  });
}
bootstrap();
