import { Controller, UseGuards, UseInterceptors, Get } from "@nestjs/common";
var forEach = require('async-foreach').forEach;

import { Foods} from "../enitity/foods.entity";
import { FoodsService } from "./foods.service";
import { ApiHeader, ApiTags, ApiBearerAuth, ApiResponse, ApiOperation} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import {
    Crud,
    CrudController,
    Override,
    CrudRequest,
    ParsedRequest,
    ParsedBody,
    CreateManyDto,
    CrudRequestInterceptor
  } from '@nestjsx/crud';

@Crud({
  model: {
    type: Foods,
  },
})
@ApiTags('Food Module')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("Foods")
export class FoodsController implements CrudController<Foods> {
    constructor(
        public service: FoodsService,
        ) {}
    get base(): CrudController<Foods> {
        return this;
    }

    @Override()
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Foods,
    ) {
        return this.base.createOneBase(req, dto);
    }

    @Override()
    getMany(
        @ParsedRequest() req: CrudRequest,
    ) {
        return this.base.getManyBase(req);
    }

    @UseInterceptors(CrudRequestInterceptor)
    @Get('/List')
    @ApiOperation({ summary: "costOfProduction > selling", description: 'Get food with costOfProduction higher than selling cost ' })
    async exportSome(@ParsedRequest() req: CrudRequest) {
    // some awesome feature handling
    return this.base.getManyBase(req).then(res =>{
       let foodList= [];
        // foodList = res;
        forEach(res, function(item, index, arr) {
          if(+item.productioncost> +item.price){
            foodList.push(item)
           }
        });
        return foodList;
         
    });
    
    
    }
}



