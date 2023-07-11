import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { Image } from "./image.entity";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 128 })
  mark: string;

  @Column({ length: 128 })
  model: string;

  @Column({ length: 4 })
  year: string;

  @Column({ length: 128 })
  color: string;

  @Column({ length: 128 })
  fuelType: string;

  @Column({ length: 128 })
  kilometers: string;

  @Column({ length: 256 })
  imageCap: string;

  @Column({ length: 128 })
  price: string;

  @Column({ length: 128 })
  tablePriceFiper: string;

  @Column({ length: 256, nullable: true })
  description: string;

  @Column()
  isGoodPurchase: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Image, (images) => images.post, {
    nullable: true,
    onDelete: "CASCADE",
  })
  images: Image[];

  @OneToMany(() => Comment, (comments) => comments.post, {})
  comments: Comment[];
}
