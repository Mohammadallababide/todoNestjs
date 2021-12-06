import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { SpaAuthService } from './services';
import { JwtModule } from '@nestjs/jwt';
import {
  SpaAuthConstants,
  SpaAuthModuleAsyncOptions,
  SpaAuthModuleOptionsFactory,
  SpaAuthOptions,
} from './shared';
import { JwtStrategy } from './strategies';
@Global()
@Module({})
export class UserAuthModule {
  static register(options: SpaAuthOptions): DynamicModule {
    return {
      module: UserAuthModule,
      imports: [
        JwtModule.register({
          secret: options.useAccessToken.jwtAccessSecretKey,
        }),
      ],
      providers: [
        {
          provide: SpaAuthConstants.SPA_AUTH_MODULE_OPTIONS,
          useValue: options,
        },
        {
          provide: SpaAuthConstants.SPA_AUTH_SERVICE_TOKEN,
          useClass: SpaAuthService,
        },
        JwtStrategy,
      ],
      exports: [
        {
          provide: SpaAuthConstants.SPA_AUTH_SERVICE_TOKEN,
          useClass: SpaAuthService,
        },
      ],
    };
  }

  static registerAsync(options: SpaAuthModuleAsyncOptions): DynamicModule {
    return {
      module: UserAuthModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: SpaAuthConstants.SPA_AUTH_SERVICE_TOKEN,
          useClass: SpaAuthService,
        },
        ...(options.extraProviders || []),
      ],
      exports: [
        {
          provide: SpaAuthConstants.SPA_AUTH_SERVICE_TOKEN,
          useClass: SpaAuthService,
        },
      ],
    };
  }

  private static createAsyncProviders(
    options: SpaAuthModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: SpaAuthModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: SpaAuthConstants.SPA_AUTH_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: SpaAuthConstants.SPA_AUTH_MODULE_OPTIONS,
      useFactory: async (optionsFactory: SpaAuthModuleOptionsFactory) =>
        optionsFactory.createSpaAuthModuleOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
