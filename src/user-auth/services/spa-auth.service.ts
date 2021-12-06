import { Inject, Injectable } from '@nestjs/common';
import {
  AlphaCookiesOptions,
  CookieObject,
  IPayload,
  NotEnoughDataException,
  SpaAuthConstants,
  SpaAuthOptions,
} from '@app/user-auth/shared';
import { JwtService } from '@nestjs/jwt';
import { TokensDto } from '@app/user-auth/dtos';

@Injectable()
export class SpaAuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(SpaAuthConstants.SPA_AUTH_MODULE_OPTIONS)
    private readonly spaAuthOptions: SpaAuthOptions,
  ) {}
  async generateAccessToken(payload: IPayload): Promise<string> {
    const { useAccessToken } = this.spaAuthOptions;
    if (!useAccessToken.jwtAccessSecretKey) {
      throw new NotEnoughDataException();
    }
    return this.jwtService.sign(payload, {
      secret: useAccessToken.jwtAccessSecretKey,
      expiresIn: useAccessToken.jwtAccessActivationPeriod || '5 minutes',
    });
  }

  async generateAccessTokenAsTwoCookies(
    payload: IPayload,
    firstCookieOptions: AlphaCookiesOptions,
    secondCookiesOptions: AlphaCookiesOptions,
  ): Promise<{
    firstCookie: CookieObject;
    secondCookie: CookieObject;
    token: string;
  }> {
    const token = await this.generateAccessToken(payload);
    const tokensPart = token.split('.');
    const headerAndPayload = `${tokensPart[0]}.${tokensPart[1]}`;
    const signature = tokensPart[2];
    const firstCookie: CookieObject = {
      value: headerAndPayload,
      options: firstCookieOptions,
    };

    const secondCookie: CookieObject = {
      value: signature,
      options: secondCookiesOptions,
    };
    return {
      firstCookie,
      secondCookie,
      token,
    };
  }

  async generateRefreshToken(payload: IPayload): Promise<string> {
    const { useRefreshToken } = this.spaAuthOptions;
    if (!useRefreshToken.jwtRefreshSecretKey) {
      throw new NotEnoughDataException();
    }
    return this.jwtService.sign(payload, {
      secret: useRefreshToken.jwtRefreshSecretKey,
      expiresIn: useRefreshToken.jwtRefreshActivationPeriod || '5 days',
    });
  }

  async generateTokens(payload: IPayload): Promise<TokensDto> {
    return {
      access: await this.generateAccessToken(payload),
      refresh: await this.generateRefreshToken(payload),
    };
  }

  verifyRefreshToken<T extends object = any>(token: string): T {
    return this.jwtService.verify<T>(token, {
      secret: this.spaAuthOptions.useRefreshToken.jwtRefreshSecretKey,
    });
  }
  verifyAccessToken<T extends object = any>(token: string): T {
    return this.jwtService.verify<T>(token, {
      secret: this.spaAuthOptions.useAccessToken.jwtAccessSecretKey,
    });
  }
}
