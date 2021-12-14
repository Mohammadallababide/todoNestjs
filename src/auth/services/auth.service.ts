import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { UserI } from 'src/user/models/user.interface';
import bcrypt from 'bcryptjs';
// import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()   
export class AuthService {

    constructor(private readonly jwtService: JwtService) {}

    generateJwt(user: UserI): Observable<string> {
        return from(this.jwtService.signAsync({user}));
    }

    hashPassword(password: string): Observable<string> {
        return from<string>(bcrypt.hash(password, 12));
    }

    comparePasswords(password: string, storedPasswordHash: string): Observable<any> {
        return from(bcrypt.compare(password, storedPasswordHash));
    }
}