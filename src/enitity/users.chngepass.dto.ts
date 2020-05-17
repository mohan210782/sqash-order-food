import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, MongoEntityManager, BeforeInsert,ManyToOne, JoinColumn } from 'typeorm';

export enum Status {
    Active = "active",
    Inactive = "inactive",
  }


export class ChangeUserDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    password: string;
}


export class DeactivateUserDto {
    @ApiProperty()
    readonly id: number;

     @Column({  
        type: "enum",
        enum: Status,
     })
    @ApiProperty()
    readonly status: Status;
}