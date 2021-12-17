import { Body, Controller, Get, HttpCode, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
@Controller('users')
export class UserController {
    constructor(private userService :UserService){}

    @Post('register')
    create(@Body() createdUserDto: CreateUserDto): Promise<Object> {
        return  this.userService.create(createdUserDto)
        .then(user=>{
            return {
                id : user.id,
                name : user.name, 
                email : user.email,
            }
        });
    }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginUserDto: LoginUserDto): Promise<Object> {
        return this.userService.login(loginUserDto).then((jwt)=>{ 
                return {
                    access_token: jwt,
                    token_type: 'JWT',
                    expires_in: 10000
                }
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    // here replace this route you can add any other route with jwt-guards
    findAll(@Req() request): Promise<User[]> {
        return this.userService.findAll();
    }
}
