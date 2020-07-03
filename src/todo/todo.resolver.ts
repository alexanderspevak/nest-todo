import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { CurrentUser } from '../auth/user.decorator';
import { User } from '../user/user.model';

@Resolver(of => Todo)
export class TodoResolver {
  constructor(@Inject(TodoService) private todoService: TodoService) {}

  @Query(returns => [Todo])
  async todos(@CurrentUser() user: User): Promise<Todo[]> {
    return this.todoService.find(user);
  }

  @Mutation(returns => Todo)
  async createTodo(
    @CurrentUser() userPromise: User,
    @Args('name') name: string,
    @Args('description') description: string,
  ): Promise<Todo> {
    const user = await userPromise;
    return this.todoService.create({ name, description, user });
  }

  @Mutation(returns => String)
  async deleteTodo(
    @CurrentUser() userPromise: User,
    @Args('id') id: string,
  ): Promise<string> {
    const user = await userPromise;
    return this.todoService.delete({ id, user });
  }

  @Mutation(returns => Todo)
  async changeTodoStatus(
    @CurrentUser() userPromise: User,
    @Args('id') id: string,
  ): Promise<Todo> {
    const user = await userPromise;
    return this.todoService.changeStatus({ id, user });
  }
}
