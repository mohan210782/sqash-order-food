import {
    Controller,
    UseGuards,
    HttpStatus,
    Response,
    Inject,
    Request,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
  } from '@nestjs/common';
  import { ApiHeader, ApiBody, ApiTags, ApiBearerAuth, ApiResponse, ApiOperation} from '@nestjs/swagger';
  import { AuthService } from './auth.service';
  import { UsersService } from '../users/users.service';
  import { CreateUserDto, UpdateUserDto } from '../enitity/users.dto';
  import { ChangeUserDto, DeactivateUserDto } from '../enitity/users.chngepass.dto';
  //import { debug } from 'util';
  import { LoginUserDto } from './login.dto';
  import { AuthGuard } from '@nestjs/passport';
  import {LoggerService} from '../logger/logger.service';
  
  @ApiTags('User Module')
  @ApiBearerAuth()
  @Controller('auth')
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly usersService: UsersService,
      private readonly loggerService: LoggerService,
      
    ) {}
  
    //@ApiTags('Signup')
   
    @Post('register')
    public async register(@Response() res, @Body() createUserDto: CreateUserDto) {
      const result = await this.authService.register(createUserDto);
      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
      return res.status(HttpStatus.OK).json(result);
    }

    //@UseGuards(AuthGuard('local'))
    //@ApiTags('Login')
    @Post('login')
    public async login(@Response() res, @Body() login: LoginUserDto) {
      this.loggerService.log(login, 'login data');
      const user = await this.usersService.findByEmail(login.email);
      this.loggerService.log(user, 'login data fetched' );
    //user.comparePassword(password)
      if(user && user.status == 'active'){
          user.comparePassword(login.password)
          .then(resultnew =>{
              console.log("rest", resultnew);
              if(resultnew == true){
                const token = this.authService.createToken(user);
            //debug(token.accessToken);
            return res.status(HttpStatus.OK).json(token);
              }else{
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                  message: 'Login Failed',
                });
              }
          })
        }else{
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Not An Active User',
          });
        }
    
    }


    @UseGuards(AuthGuard('jwt'))
    //@ApiTags('Reset Password')
    @ApiOperation({ summary: 'Update Password' })
    @Put('reset-password')
    public async update(@Response() res, @Body() changeUserDto: ChangeUserDto) {
      this.loggerService.log(changeUserDto, "change password input");
      const result = await this.authService.update(changeUserDto);
      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
      return res.status(HttpStatus.OK).json(result);
    }


    @UseGuards(AuthGuard('jwt'))
    //@ApiTags('Deactivate')
    @ApiOperation({ summary: 'Update User' })
    @Put('update')
    public async updateUser(@Response() res, @Body() updateUserDto: UpdateUserDto) {
      const result = await this.authService.updateUser(updateUserDto);
      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
      return res.status(HttpStatus.OK).json(result);
    }


    @UseGuards(AuthGuard('jwt'))
    //@ApiTags('Deactivate')
    @ApiOperation({ summary: 'Update User Status', description : 'Activate or deactivate the user' })
    @Put('deactivate')
    public async deactivate(@Response() res, @Body() deactivateUserDto: DeactivateUserDto) {
      const result = await this.authService.deactivate(deactivateUserDto);
      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
      return res.status(HttpStatus.OK).json(result);
    }




    @UseGuards(AuthGuard('jwt'))
    //@ApiTags('Deactivate')
    @ApiOperation({ summary: 'Get all users.' })
    @Get('List')
    public async ListUser(@Response() res) {
      const result = await this.authService.listUser();
      if (!result.success) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
      return res.status(HttpStatus.OK).json(result);
    }
  
  
    
  }