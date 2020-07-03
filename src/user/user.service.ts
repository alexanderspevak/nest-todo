import * as EmailValidator from 'email-validator';
import { randomBytes } from 'crypto';
import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { Password } from '../auth/password';
import { store } from '../store';
import { ErrorMessages } from '../errorMessages';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create({ password, email }: UserDTO): Promise<string> {
    if (password.length < 4) {
      throw new Error('password too short');
    }

    if (!EmailValidator.validate(email)) {
      throw new Error('invalid email');
    }

    const user = new User();

    user.email = email;
    user.password = await Password.toHash(password);

    await this.userRepository.save(user);

    const apiKey = randomBytes(8).toString('hex');
    await store.set(apiKey, user.id);

    return apiKey;
  }

  public findOne(email: string): Promise<User> {
    return this.userRepository.findOne(email);
  }

  public async login({ password, email }: UserDTO): Promise<string> {
    const user = await this.userRepository.findOne({ email });
    if (user == null) {
      throw new Error(ErrorMessages.WRONG_PASSWORD);
    }

    console.log(
      'password compare',
      await Password.compare(user.password, password),
    );

    if (!(await Password.compare(user.password, password))) {
      throw new Error(ErrorMessages.WRONG_PASSWORD);
    }

    const apiKey = randomBytes(8).toString('hex');

    await store.set(apiKey, user.id);

    return apiKey;
  }
}
