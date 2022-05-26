import { Album } from 'src/album/album.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IPhoto {
  id: string;

  name?: string;

  link: string;

  createdAt: Date;

  updatedAt?: Date;
}

@Entity({ name: 'Photo' })
export class Photo implements IPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column()
  link: string;

  @CreateDateColumn({ name: 'date_created', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'date_updated', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.photos, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Album, (album) => album.photos, { onDelete: 'CASCADE' })
  album: Album;
}
