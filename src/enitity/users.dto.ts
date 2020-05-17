import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, MongoEntityManager, BeforeInsert,ManyToOne, JoinColumn } from 'typeorm';
import {Order} from './orders.entity';
export enum Status {
    Active = "active",
    Inactive = "inactive",
  }
export class CreateUserDto {
    //@ApiProperty()
    //readonly id: number;

    @ApiProperty()
    firstname: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @Column({  
        type: "enum",
        enum: Status,
     })
    @ApiProperty()
    status: Status;


    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    @ApiProperty()
    public createdAt: Date;

   
}

export class UpdateUserDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    firstname: string;

    @ApiProperty()
    lastname: string;

    @ApiProperty()
    email: string;

    @Column({  
        type: "enum",
        enum: Status,
     })
    @ApiProperty()
    status: Status;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    @ApiProperty()
    public updatedAt: Date;
}