import { ConfigFactory } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export const generateAppConfigFactory = (
  configFilePath: string,
): ConfigFactory => {
  return () => {
    return yaml.load(
      readFileSync(join(__dirname, configFilePath), 'utf8'),
    ) as Record<string, any>;
  };
};
