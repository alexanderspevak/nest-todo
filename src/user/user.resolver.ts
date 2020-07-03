import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Mutation(returns => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    return this.userService.login({ email, password });
  }

  @Mutation(returns => String)
  async createUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    return this.userService.create({ email, password });
  }
}
