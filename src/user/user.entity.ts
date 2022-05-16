import { Post } from 'src/post/post.entity';
import { Photo } from 'src/photo/photo.entity';
import { UserAlbum } from 'src/user-album/user-album.entity';
import { Comment } from 'src/comment/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IUserEntity {
  id: string;

  userName: string;

  name?: string;

  email: string;

  password: string;

  role: UserRole;

  status: UserStatus;

  createdAt: Date;

  updatedAt?: Date;
}

@Entity({ name: 'User' })
export class User implements IUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn({ name: 'date_registed', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'date_updated', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.INACTIVE,
  })
  status: UserStatus;

  @OneToMany(() => Photo, (photo) => photo.user, {
    cascade: true,
  })
  photos?: Photo[];

  @OneToMany(() => UserAlbum, (userAlbum) => userAlbum.user, {
    cascade: true,
  })
  userAlbum?: UserAlbum[];

  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]
}
