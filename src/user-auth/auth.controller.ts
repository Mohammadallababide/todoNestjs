import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Query,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtExceptionFilter } from '@app/user-auth/filters';
import { Response } from 'express';
import { SpaAuthService } from '@app/user-auth/services';
import {
  AccountNotYetActivatedException,
  BadLoginCredentialsException,
  Role,
  SpaAuthConstants,
} from '@app/user-auth/shared';
import { TokensDto } from '@app/user-auth/dtos';
import { JwtAuthGuard } from '@app/user-auth/guards';
export type UserType = {
  email: string;
  role?: Role;
  id?: string;
  isActivated?: boolean;
  tokens?: TokensDto;
};
export const currentUsers: UserType[] = [];
@Controller('authentication')
@UseFilters(JwtExceptionFilter)
export class AuthController {
  constructor(
    @Inject(SpaAuthConstants.SPA_AUTH_SERVICE_TOKEN)
    private readonly authService: SpaAuthService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: UserType, @Res() response: Response): Promise<any> {
    const user = currentUsers.filter(
      (user) => user.id === data['id'] || user.email === data['email'],
    )[0];
    if (!user) throw new BadLoginCredentialsException();
    if (user.isActivated == false) throw new AccountNotYetActivatedException();

    const cookies = await this.authService.generateAccessTokenAsTwoCookies(
      user,
      {
        secure: true,
        expires: new Date(new Date().getTime() + 30 * 60 * 1000),
        httpOnly: false,
      },
      {
        secure: true,
        httpOnly: true,
      },
    );
    const { firstCookie, secondCookie, token } = cookies;

    response.cookie(
      SpaAuthConstants.COOKIE_FIRST_AND_SECOND_PARTS,
      firstCookie.value,
      firstCookie.options,
    );
    response.cookie(
      SpaAuthConstants.COOKIE_THIRD_PART,
      secondCookie.value,
      secondCookie.options,
    );

    return response.status(200).json({
      user,
      token,
    });
  }

  @Post('/sign-up')
  createNewUser(@Body() user: UserType) {
    const created = {
      ...user,
      role: user.role || Role.USER,
      isActivated: true,
      id: new Date().toISOString(),
    };
    currentUsers.push(created);
    return created;
  }
  @Get('/refresh')
  async refreshToken(@Query('token') token: string): Promise<TokensDto> {
    const payload = this.authService.verifyRefreshToken(token);
    return this.authService.generateTokens(payload);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return currentUsers;
  }
}
