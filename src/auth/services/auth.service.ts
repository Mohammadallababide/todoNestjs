import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { UserI } from 'src/user/models/user.interface';
import bcrypt from 'bcryptjs';
// import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()   
export class AuthService {

    constructor(private readonly jwtService: JwtService) {}

  async  generateJwt(user: UserI):Promise<string> {
        return this.jwtService.signAsync({user});
    }

  async  hashPassword(password: string):Promise<string> {
        return bcrypt.hash(password, 12);
    }

   async comparePasswords(password: string, storedPasswordHash: string): Promise<any> {
        return bcrypt.compare(password, storedPasswordHash);
    }
}