import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Todo } from '../todo/todo.model';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Unique(['email'])
  @Field()
  @Column({ nullable: false })
  email: string;

  @Field()
  @Column({ nullable: false })
  password: string;

  @Field(type => [Todo])
  @OneToMany(
    type => Todo,
    todo => todo.user,
  )
  todos: Todo[];
}
