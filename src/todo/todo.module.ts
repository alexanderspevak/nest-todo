import { Todo } from './todo.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { User } from '../user/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  providers: [TodoResolver, TodoService],
  exports: [TodoService],
})
export class TodoModule {}
