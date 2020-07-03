import { User } from './user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
