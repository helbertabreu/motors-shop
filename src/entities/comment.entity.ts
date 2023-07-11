import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Post } from "./post.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 512 })
  description: string;

  @Column({ length: 256 })
  userComment: string;

  @Column({ length: 256 })
  userCommentId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Post, (post) => post.comments, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  post: Post;
}
