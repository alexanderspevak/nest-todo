import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { store } from '../store';
import { getManager } from 'typeorm';
import { User } from '../user/user.model';
import { ErrorMessages } from '../errorMessages';

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const apiKey = req.headers.apikey;

    const userId = await store.get(apiKey);

    if (!userId) {
      throw new Error(ErrorMessages.NOT_AUTHORIZED);
    }

    const entityManager = await getManager();

    const user = await entityManager.findOne(User, userId);

    return user;
  },
);
