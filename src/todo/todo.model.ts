import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
@Entity()
export class Todo {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: false })
  description: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(type => User)
  @ManyToOne(
    type => User,
    user => user.todos,
  )
  user: User;

  @Field({ nullable: true })
  @Column({ nullable: false })
  status: string;
}
