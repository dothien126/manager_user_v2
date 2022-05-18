import { User } from 'src/user/user.entity';
import { Comment } from 'src/comment/comment.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum postStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export interface IPost {
  id: string;

  title: string;

  content: string;

  like: number;

  dislike: number;

  createdAt: Date;

  updatedAt?: Date;
}

@Entity({ name: 'Post' })
export class Post implements IPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  content: string;

  @Column({ type: 'integer' })
  like: number;

  @Column({ type: 'integer' })
  dislike: number;

  @Column({
    type: 'enum',
    enum: postStatus,
    default: postStatus.PRIVATE,
  })
  status: postStatus;

  @CreateDateColumn({ name: 'date_created', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'date_updated', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author' })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]
}
