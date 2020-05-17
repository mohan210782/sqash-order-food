import { Column, Entity, PrimaryGeneratedColumn, MongoEntityManager, BeforeInsert } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity({name: "ingredients"})
export class Ingredients {
  @PrimaryGeneratedColumn()
  //@ApiProperty()
  id: number;

  @Column({unique: true})
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  lotNumber: number;
  
  @Column()
  @ApiProperty()
  availablequantity: number;

  @Column()
  @ApiProperty()
  thresholdQuantity: number;

  @Column({nullable: true})
  @ApiProperty()
  price: number;

  @Column()
  @ApiProperty()
  vendorname: string;

  @Column({nullable: true})
  @ApiProperty()
  vendoremail: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  @ApiProperty()
  public createdAt: Date;



}