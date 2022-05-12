import { Photo } from 'src/photo/photo.entity';
import { UserAlbum } from 'src/user-album/user-album.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IAlbum {
  id: string;

  name?: string;

  description: string;

  status: albumStatus;

  createdAt: Date;

  updatedAt?: Date;
}

export enum albumStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

@Entity({ name: 'Album' })
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: albumStatus,
    default: albumStatus.PRIVATE,
  })
  status: albumStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @OneToMany(() => Photo, (photo) => photo.user, {
    cascade: true,
  })
  photos: Photo[];

  @OneToMany(() => UserAlbum, (userAlbum) => userAlbum.album, {
    cascade: true,
  })
  userAlbum?: UserAlbum[];
}
