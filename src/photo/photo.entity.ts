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

  status: photoStatus;

  createdAt: Date;

  updatedAt?: Date;
}

export enum photoStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

@Entity({ name: 'Photo' })
export class Photo implements IPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column()
  link: string;

  @Column({
    type: 'enum',
    enum: photoStatus,
    default: photoStatus.PRIVATE,
  })
  status: photoStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.photos, { onDelete: 'CASCADE' })
  user: User;
}
