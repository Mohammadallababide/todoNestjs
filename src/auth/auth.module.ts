import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '10000s'}
      })
    })
  ],
  providers: [AuthService,JwtAuthGuard,JwtStrategy],
  exports : [AuthService]
})
export class AuthModule {}
