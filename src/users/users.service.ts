import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Users } from '../enitity/users.entity';
import { CreateUserDto, UpdateUserDto } from '../enitity/users.dto';
import { ChangeUserDto, DeactivateUserDto} from '../enitity/users.chngepass.dto';
import { LoggerService} from '../logger/logger.service';

import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly loggerService: LoggerService
   
  ) {
  
  }

  public async findAll(): Promise<any> {
    return await this.userRepository.find();
  }

  public async findByEmail(userEmail: string): Promise<any> {
    try{
      this.loggerService.log(userEmail, 'user find db');
      let user = await this.userRepository.findOne({ email: userEmail });
      this.loggerService.log(user, 'user find db');
      return user;

    }
    catch(err){
      this.loggerService.error(err, 'login error')
      return err
    }
  }

  public async findById(id: number): Promise <any>{
    return await this.userRepository.findOneOrFail(id);
  }

  public async create(user: CreateUserDto): Promise <any>{
      console.log("user-------",user);
      this.loggerService.log(user, "user details");
    return await this.userRepository.save(user);
  }

  public async updateUser(
    id: number,
    newValue: UpdateUserDto,
  ): Promise<any> {
    const user = await this.userRepository.findOneOrFail(id);
    if (!user.id) {
      // tslint:disable-next-line:no-console
      console.error("user doesn't exist");
    }
 
    await this.userRepository.update(id, newValue);
    return await this.userRepository.findOne(id);
  }

  public async update(
    id: number,
    newValue: ChangeUserDto,
  ): Promise<any> {
    const user = await this.userRepository.findOneOrFail(id);
    if (!user.id) {
      // tslint:disable-next-line:no-console
      console.error("user doesn't exist");
    }
  
    newValue.password = await bcrypt.hash(newValue.password, 10);
    await this.userRepository.update(id, newValue);
    return await this.userRepository.findOne(id);
  }

  public async updateStatus(
    id: number,
    newValue: DeactivateUserDto,
  ): Promise<any> {
    const user = await this.userRepository.findOneOrFail(id);
    if (!user.id) {
      // tslint:disable-next-line:no-console
      console.error("user doesn't exist");
    }
   
    await this.userRepository.update(id, newValue);
    return await this.userRepository.findOne(id);
  }

  public async delete(id: number): Promise <any>{
    return await this.userRepository.delete(id);
  }

  public async register(userDto: CreateUserDto): Promise<any> {
    //console.log(userDto);
    this.loggerService.log(userDto, "userdetails")
    const { email } = userDto;
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    try{
    user = await this.userRepository.create(userDto);
    return await this.userRepository.save(user);
    }
    catch(err){
      this.loggerService.error("user register", err)
      return err
    }
  }
}