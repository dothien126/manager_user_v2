import { Post } from "src/post/post.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export interface IComment {
    id: string,

    content: string,

    createdAt: Date;

    updatedAt?: Date; 
}

@Entity({name: 'Comment'})
export class Comment implements IComment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string;

    @CreateDateColumn({ name: 'date_comment', type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'date_update_comment', type: 'timestamp', nullable: true })
    updatedAt?: Date;

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;
}