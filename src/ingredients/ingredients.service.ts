import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Ingredients } from "../enitity/Ingredients.entity";
import {LoggerService} from '../logger/logger.service';

@Injectable()
export class IngredientsService extends TypeOrmCrudService<Ingredients> {
  constructor(@InjectRepository(Ingredients) repo,
  private readonly loggerService: LoggerService,
  ) {
    super(repo);
  }
}

