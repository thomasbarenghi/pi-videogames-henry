import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;
}
