import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    ColumnType,
    OneToMany,
    ManyToMany,
    JoinTable,
    
    
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { UserRO } from './users.ro';
import { Order } from './orders.entity';

export enum Status {
  Active = "active",
  Inactive = "inactive",
}

@Entity({name: "users"})
export class Users {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({unique: true,})
  email: string;

  @Column()
  password: string;

  @Column({  
    type: "enum",
    enum: Status,
    default: Status.Active
  })
  status: Status;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  @ApiProperty()
  public lastLoginAt: Date;


  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  @ApiProperty()
  public createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  @ApiProperty()
  public updatedAt: Date;

  
  @OneToMany(() => Order, (order: Order) => order.user_id)
  order: Order[]



  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }


  async comparePassword(attempt: string): Promise<any> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, firstname, lastname, email, status } = this;
    const responseObject: UserRO = {
      id,
      firstname,
      lastname,
      email,
      status
    };

    return responseObject;
  }
}