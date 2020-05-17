import { Column, Entity, PrimaryGeneratedColumn, MongoEntityManager, BeforeInsert } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity({name: "food"})
export class Foods {
  @PrimaryGeneratedColumn()
  //@ApiProperty()
  id: number;

  @Column({unique: true})
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  cuisine: string;

  @Column("simple-array")
  @ApiProperty()
  ingredients: string[];

  
  @Column()
  @ApiProperty()
  lotNumber: number;
  
  @Column()
  @ApiProperty()
  productioncost: number;

  @Column({nullable: true})
  @ApiProperty()
  price: number;

  @Column({nullable: true})
  @ApiProperty()
  status: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  @ApiProperty()
  public createdAt: Date;



}