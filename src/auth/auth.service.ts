import * as jwt from 'jsonwebtoken';
import { Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserRO } from '../enitity/users.ro';
import { debug } from 'console';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { CreateUserDto, UpdateUserDto } from '../enitity/users.dto';
import { Users } from '../enitity/users.entity';
import { ChangeUserDto, DeactivateUserDto } from '../enitity/users.chngepass.dto';
import { LoggerService } from '../logger/logger.service';



@Injectable()
export class AuthService {
  constructor(
      private readonly usersService: UsersService,
      private readonly loggerService: LoggerService,
      ) {
        
      }

  //private readonly logger = new Logger(AuthService.name);
  
  async register(user: CreateUserDto) {
    // this.loggerService.log('password check success');
    // this.loggerService.warn('About to return cats!');
    // this.loggerService.error('About to return cats!');
    // this.loggerService.debug('About to return cats!');
    // this.loggerService.verbose('About to return cats!');
    // this.loggerService.log('About to return cats!');
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };
    try {
      await this.usersService.register(user);
    } catch (err) {
      //debug(err);
    this.loggerService.error(err);
      status = { success: false, message: err };
    }
    return status;
  }

  async update(user: ChangeUserDto) {
   
    let status: RegistrationStatus = {
      success: true,
      message: 'user update',
    };
    try {
      await this.usersService.update(user.id, user);
    } catch (err) {
      //debug(err);
    this.loggerService.error(err, "change password");
      status = { success: false, message: err };
    }
    return status;
  }


  async updateUser(user: UpdateUserDto) {
   
    let status: RegistrationStatus = {
      success: true,
      message: 'user update',
    };
    try {
      await this.usersService.updateUser(user.id, user);
    } catch (err) {
      //debug(err);
    //this.loggerService.error(err);
      status = { success: false, message: err };
    }
    return status;
  }

  async deactivate(user: DeactivateUserDto) {
  
    let status: RegistrationStatus = {
      success: true,
      message: 'user update',
    };
    try {
      await this.usersService.updateStatus(user.id, user);
    } catch (err) {
      //debug(err);
    //this.loggerService.error(err);
      status = { success: false, message: err };
    }
    return status;
  }

  async listUser() {
  
    let status: RegistrationStatus = {
      success: true,
      message: 'user update',
    };
    try {
      return await this.usersService.findAll();
    } catch (err) {
      //debug(err);
    //this.loggerService.error(err);
      status = { success: false, message: err };
    }
    return status;
  }

  createToken(user: Users) {
    //debug('get the expiration');
    const expiresIn = 3600;
    //debug('sign the token');
    //debug(user);

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      'Codebrains',
      { expiresIn },
    );
    //debug('return the token');
    //debug(accessToken);
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUserToken(payload: JwtPayload): Promise <any>{
    return await this.usersService.findById(payload.id);
  }
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    //this.loggerService.log('password check success', user);
    //this.loggerService.log(password, 'password');
  //user.comparePassword(password)
    // user.comparePassword(password)
    // .then(res =>{
    //     console.log("rest", res);
    // })
    // console.log("compass", comPass);
    // if (comPass == true) {
    //   this.loggerService.log('password check success');
    //   const { password, ...result } = user;
    //   return result;
    // }else{
    //     this.loggerService.log('password check failed');
    //     return null
    // }
    return null;
  }
}