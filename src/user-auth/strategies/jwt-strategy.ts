import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  SpaAuthConstants,
  SpaAuthOptions,
  StrategiesNames,
} from '@app/user-auth/shared';
import { Request } from 'express';

export function extractJWTFromCookies(req: Request): string | null {
  if (
    !req.cookies[SpaAuthConstants.COOKIE_FIRST_AND_SECOND_PARTS] ||
    !req.cookies[SpaAuthConstants.COOKIE_THIRD_PART]
  )
    return null;
  const firstPart = req.cookies[SpaAuthConstants.COOKIE_FIRST_AND_SECOND_PARTS];
  const secondPart = req.cookies[SpaAuthConstants.COOKIE_THIRD_PART];
  return `${firstPart}.${secondPart}`;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  StrategiesNames.ALPHA_JWT,
) {
  constructor(
    @Inject(SpaAuthConstants.SPA_AUTH_MODULE_OPTIONS)
    public spaModuleOptions: SpaAuthOptions,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractJWTFromCookies,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: spaModuleOptions.useAccessToken.jwtAccessSecretKey,
    });
  }

  async validate(payload: { id: number; email: string }): Promise<any> {
    if (!this.spaModuleOptions.useBuiltInJwtStrategy) return payload;

    const { sequelizeInstance, userTableName } =
      this.spaModuleOptions.useBuiltInJwtStrategy;

    const userModel = sequelizeInstance.model(userTableName);
    const user = await userModel.findOne({
      where: { ...payload },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
