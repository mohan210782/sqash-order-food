import { Column, Entity, PrimaryGeneratedColumn, MongoEntityManager, BeforeInsert,ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users} from './users.entity';

export enum Status {
  Open = "open",
  Preparation = "preparation",
  Prepared = 'prepared',
  Delivered = 'delivery',
  closed = "closed",
  Rejected = 'rejected'
}
@Entity({name: "foodorders"})
export class Order {
  @PrimaryGeneratedColumn()
  //@ApiProperty()
  id: number;

  
  @Column({nullable: false})
  @ApiProperty()
  user_id: number;

  @Column("simple-array")
  @ApiProperty()
  items: string[];

  @Column({nullable: true})
  @ApiProperty()
  totalcost: number;

  @Column({  
    type: "enum",
    enum: Status,
    default: Status.Open
 })
  status: Status;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  @ApiProperty()
  public orderDate: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  @ApiProperty()
  public dateofdelivery: Date;

  @Column({nullable: false})
  @ApiProperty()
  modeoftansport: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  @ApiProperty()
  public created_on: Date;

  //@ApiProperty({ type: () => Users })
  @ManyToOne(() => Users, (users: Users) => users.id)
  public user: Users;


 


}