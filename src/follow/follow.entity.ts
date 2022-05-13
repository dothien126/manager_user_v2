import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface IFollow {
  id: string;

  followingId: string

  createdAt: Date;
}

@Entity({ name: 'Follow' })
export class Follow implements IFollow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'following_id'})
  followingId!: string;

  @CreateDateColumn({ name: 'date_follow', type: 'timestamp' })
  createdAt: Date;

  @ManyToMany(() => User)
  @JoinTable({name: 'User_Follow'})
  user: User;
}
