import { ModuleMetadata, Provider, Type } from '@nestjs/common';
import { SpaAuthOptions } from '../types';

export interface SpaAuthModuleOptionsFactory {
  createSpaAuthModuleOptions(): Promise<SpaAuthOptions> | SpaAuthOptions;
}

export interface SpaAuthModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<SpaAuthModuleOptionsFactory>;
  useClass?: Type<SpaAuthModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<SpaAuthOptions> | SpaAuthOptions;
  inject?: any[];
  extraProviders?: Provider[];
}
