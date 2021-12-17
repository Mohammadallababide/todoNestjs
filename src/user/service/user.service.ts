import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable,from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/auth/services/auth.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/dto/CreateUser.dto';
import { LoginUserDto } from '../models/dto/LoginUser.dto';
import { UserI } from '../models/user.interface';
import { User } from '../models/user.model';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private authService : AuthService
  ){ }

 async findAll():Promise<User[]>{
    return this.userModel.findAll({  attributes: ['id', 'email',]});
}
async findOne(id: number): Promise<User>{
return this.userModel.findOne({
    where: {
        id,
      },
});}

 async findUserByEmail(email: string): Promise<User> {
   return this.userModel.findOne({
       where : {
email
},
    attributes: ['id', 'email', 'name', 'password']
}) 
}

  private validatePassword(password: string, storedPasswordHash: string): Promise<boolean> {
      return this.authService.comparePasswords(password, storedPasswordHash);
  }

  private async emailExists(email: string):Promise<boolean>{
  return await this.userModel.findOne({
      where:{email}
    }).then(user=>{
      if(user){
        return true;
      }
      else{
         return false;
      }
    })
  }



async login(loginUserDto:LoginUserDto):Promise<any>{
  return await this.findUserByEmail(loginUserDto.email)
  .then(async user=>{
    if(user){
      return await  this.validatePassword(loginUserDto.password,user.password)
      .then(async isPassValid=>{
        if(isPassValid){
          return await    this.findOne(user.id)
          .then(async user=>{
            return await this.authService.generateJwt(user);
          //  console.log(s);
          })
        }else{
          throw new HttpException('Login was not Successfulll', HttpStatus.UNAUTHORIZED);
        } 
      })
    }
    else{
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  })
}


async create(createdUserDto: CreateUserDto) :Promise<any> {
  return await this.emailExists(createdUserDto.email)
 .then(async exists=>{
if(!exists){
return await this.authService.hashPassword(createdUserDto.password)
.then(async hashPass=>{
   // Overwrite the user password with the hash, to store it in the db
  createdUserDto.password = hashPass;
  return await  this.userModel.create(createdUserDto)
  .then(result=>{
    console.log('Successfulll sigin in');
    return result;
  })
})
}else{
  throw new HttpException('Email already in use', HttpStatus.CONFLICT);
}
})
}
}