import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Genre } from 'src/genres/entities/genre.entity';
import { Platform } from 'src/platforms/entities/platform.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  background_image: string;

  @Column()
  released: Date;

  @Column()
  rating: number;

  @Column()
  source: string;

  // Relación Many-to-Many con Genre
  @ManyToMany(() => Genre, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinTable({
    name: 'game_genre',
    joinColumn: {
      name: 'game_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  genres: Genre[];

  // Relación Many-to-Many con Platform
  @ManyToMany(() => Platform, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinTable({
    name: 'game_platform',
    joinColumn: {
      name: 'game_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'platform_id',
      referencedColumnName: 'id',
    },
  })
  platforms: Platform[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
