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
import { JwtExceptionFilter } from './user-auth/filters';
import { Response } from 'express';
import { SpaAuthService } from './user-auth/services';
import {
  AccountNotYetActivatedException,
  BadLoginCredentialsException,
  Role,
  SpaAuthConstants,
} from './user-auth/shared';
import { TokensDto } from './user-auth/dtos';
import { JwtAuthGuard } from './user-auth/guards';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto, FindUserDto, UserDto } from './user/dtos';
import { User } from './user/models';
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
    private readonly spaAuthService: SpaAuthService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() findUserDto: FindUserDto,
    @Res() response: Response,
  ): Promise<any> {
    const user = await this.authenticationService.findUser<User>({
      where: {
        id: findUserDto.id,
      },
    });
    if (!user) throw new BadLoginCredentialsException();

    // if (user.isActivated == false) throw new AccountNotYetActivatedException();
    const cookies = await this.spaAuthService.generateAccessTokenAsTwoCookies(
      user['dataValues'],
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
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.authenticationService.createUser(createUserDto);
  }
  @Get('/refresh')
  async refreshToken(@Query('token') token: string): Promise<TokensDto> {
    const payload = this.spaAuthService.verifyRefreshToken(token);
    return this.spaAuthService.generateTokens(payload);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return currentUsers;
  }
}
