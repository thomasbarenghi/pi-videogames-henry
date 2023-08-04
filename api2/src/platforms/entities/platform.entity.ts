import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Platform {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;


  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
