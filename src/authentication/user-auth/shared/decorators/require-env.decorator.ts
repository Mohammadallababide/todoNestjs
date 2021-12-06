import { SetMetadata } from '@nestjs/common';
import { Environment } from '../enums';

export const ENV_KEY = 'required_envs';
export const SetRequiredEnv = (env: Environment) => SetMetadata('env', env);
