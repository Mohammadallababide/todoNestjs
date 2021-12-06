import { Sequelize } from 'sequelize';

export type SpaAuthOptions = {
  useAccessToken: {
    jwtAccessSecretKey: string;
    jwtAccessActivationPeriod: string;
  };
  useRefreshToken?: {
    jwtRefreshSecretKey: string;
    jwtRefreshActivationPeriod: string;
  };
  useBuiltInJwtStrategy?: {
    sequelizeInstance: Sequelize;
    userTableName: string;
  };
};
