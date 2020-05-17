import { Controller,UseGuards,  UseInterceptors, Get, Param, Query} from "@nestjs/common";
var forEach = require('async-foreach').forEach;
import { ApiHeader, ApiTags, ApiBearerAuth, ApiQuery,  ApiResponse, ApiBody, ApiParam, ApiOperation,  } from '@nestjs/swagger';

import { OrdersService } from "./orders.service";
import {LoggerService} from '../logger/logger.service';
import { AuthGuard } from '@nestjs/passport';
import { Order} from "../enitity/orders.entity";
import {
  Crud,
  CrudController,
  Override,
  CrudRequest,
  ParsedRequest,
  ParsedBody,
  CreateManyDto,
  CrudRequestInterceptor,
  
} from '@nestjsx/crud';

export enum Status {
  Open = 1,
  Preparation = 2,
  Prepared = 3,
  
}
@Crud({
  model: {
    type: Order,
  },
  params: {
    user_id:{
      field: "user_id",
      type: "number"
    }
  }
})
@ApiTags('Order Module')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("Orders")
export class OrdersController implements CrudController<Order> {
  constructor(
    public service: OrdersService,
    private loggerService: LoggerService,
    //private orderStatus : Status
    ) {}
  get base(): CrudController<Order> {
    return this;
}



  @UseInterceptors(CrudRequestInterceptor)
  @ApiParam({ 
    name: 'user_id', 
    type: Number,
    description: "Enter Id of the User"
  })
  @ApiOperation({ summary: 'Get all the orders of a user.' })
  @Get('/listnew/:user_id')
  async exportSome(@ParsedRequest() req: CrudRequest, @Param('user_id') user_id ){
    // some awesome feature handling
    this.loggerService.log(req, 'password check success');
 
    return this.base.getManyBase(req)

  }

  // @UseInterceptors(CrudRequestInterceptor)
  // @ApiParam({ name: 'user_id', enum: [1, 2, 3] })
  // @Get('/listnew1:user_id')
  // async filterByRole(@ParsedRequest() req: CrudRequest, @Param ('user_id') user_id) {
  //   this.loggerService.log(req, 'password check success');
  //   return this.base.getManyBase(req)
  // }

}
