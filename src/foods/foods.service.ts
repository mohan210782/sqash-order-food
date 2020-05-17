import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Foods } from "../enitity/foods.entity";

@Injectable()
export class FoodsService extends TypeOrmCrudService<Foods> {
  constructor(@InjectRepository(Foods) repo) {
    super(repo);
  }
}
