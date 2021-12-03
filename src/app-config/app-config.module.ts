import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { generateAppConfigFactory } from './app-config-factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      load: [
        generateAppConfigFactory('../config/development.yaml'),
        generateAppConfigFactory('../config/staging.yaml'),
        generateAppConfigFactory('../config/production.yaml'),
      ],
    }),
  ],
})
export class AppConfigModule {}
