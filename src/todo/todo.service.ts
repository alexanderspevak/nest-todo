import { Injectable } from '@nestjs/common';
import { Todo } from './todo.model';
import { User } from '../user/user.model';
import { TodoDTO } from './todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorMessages } from '../errorMessages';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create({ name, description, user }: TodoDTO): Promise<Todo> {
    const todo = new Todo();

    todo.name = name;
    todo.description = description;
    todo.status = 'open';
    todo.user = user;

    await this.todoRepository.save(todo);

    return todo;
  }

  public async find(user: User): Promise<Todo[]> {
    return this.todoRepository.find({ user });
  }

  public async delete({ user, id }: TodoDTO): Promise<string> {
    const todo = await this.todoRepository.findOne({ user, id });

    if (todo == null) {
      throw new Error(ErrorMessages.NOT_FOUND);
    }

    await this.todoRepository.delete({ id });

    return todo.id;
  }

  public async changeStatus({ user, id }: TodoDTO): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ user, id });

    if (todo == null) {
      throw new Error(ErrorMessages.NOT_FOUND);
    }

    todo.status = todo.status === 'open' ? 'closed' : 'open';

    await this.todoRepository.save(todo);

    return todo;
  }
}
