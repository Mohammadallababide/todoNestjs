import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { UserI } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
    constructor(private userService :UserService){

    }

    @Post('register')
    create(@Body() createdUserDto: CreateUserDto): Observable<UserI> {
        return this.userService.create(createdUserDto);
    }

    @Post('login')
    @HttpCode(200)
    login(@Body() loginUserDto: LoginUserDto): Observable<Object> {
        return this.userService.login(loginUserDto).pipe(
            map((jwt: string) => {
                return {
                    access_token: jwt,
                    token_type: 'JWT',
                    expires_in: 10000
                }
            })
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    // here replace this route you can add any other route with jwt-guards
    findAll(@Req() request): Observable<UserI[]> {
        return this.userService.findAll();
    }
}
