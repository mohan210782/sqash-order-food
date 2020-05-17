
import { Controller, UseGuards, UseInterceptors, Get, Param, Query } from "@nestjs/common";
var forEach = require('async-foreach').forEach;
import { Swagger } from '@nestjsx/crud/lib/crud';
import { Ingredients} from "../enitity/Ingredients.entity";
import { IngredientsService } from "./ingredients.service";
import { ApiHeader, ApiTags, ApiBearerAuth, ApiResponse, ApiParam, ApiQuery, ApiOperation} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggerService } from '../logger/logger.service';

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
    type: Ingredients,
  },
  
  params: {
    vendorname:{
      field: "vendorname",
      type: "string",
      disabled: false
    }
  },
 
})
@ApiTags('Ingredients Module')

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller("Ingredients")
export class IngredientsController implements CrudController<Ingredients> {
    constructor(
        public service: IngredientsService,
        public readonly loggerService: LoggerService,
        
        ) {

            // const metadata = Swagger.getParams(this.listIng);
            // this.loggerService.log(metadata, "metadata");
            // const queryParamsMeta = Swagger.createQueryParamsMeta('getManyBase');
            // this.loggerService.log(queryParamsMeta, "queryParamsMeta");
            // Swagger.setParams([...metadata, ...queryParamsMeta], this.listIng);
        }
    get base(): CrudController<Ingredients> {
        return this;
    }

  

    @Override()
    getMany(
        @ParsedRequest() req: CrudRequest,
    ) {
        this.loggerService.log(req);
        return this.base.getManyBase(req);
    }

    @UseInterceptors(CrudRequestInterceptor)
    @Get('/List')
    @ApiOperation({ summary: "available quantity < threshold quantity", description: 'Get ingredients whose available quantity is less than the threshold quantity' })
    async exportSome(@ParsedRequest() req: CrudRequest) {
    // some awesome feature handling
    
    return this.base.getManyBase(req).then(res =>{
       let ingredientsList= [];
        // foodList = res;
        forEach(res, function(item, index, arr) {
          if(+item.availablequantity < +item.thresholdQuantity){
            ingredientsList.push(item)
           }
        });
        return ingredientsList;
         
    });
    
    
    }

    @UseInterceptors(CrudRequestInterceptor)
    @ApiParam({ 
      name: 'vendorname', 
      type: String,
      description: "Enter Vendor Name",
      required: true
    })
    @ApiOperation({ summary: 'Get ingredients provided by same vendor.' })
    @Get('/listbyvendor/:vendorname')
    async listIng(@ParsedRequest() req: CrudRequest, @Param('vendorname') vendorname ){
      // some awesome feature handling
      this.loggerService.log('password check success');
      //console.log("req", vendorname, req);
      //this.loggerService.log(req);
      return this.base.getManyBase(req)
  
    }
}




