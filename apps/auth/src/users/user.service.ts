import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { CreateUserRequest } from './dto/create-user.request';
import { UserRepository } from './user.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(request: CreateUserRequest) {
    await this.validateCreateUserRequest(request);

    const user = this.userRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });

    return user;
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.userRepository.findOne(getUserArgs);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('User with this email does not exist');
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    return user;
  }

  /*************
    INTERNAL METHODS
  **************/

  private async validateCreateUserRequest(request: CreateUserRequest) {
    let user: User;
    try {
      user = await this.userRepository.findOne({ email: request.email });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('Email already exists');
    }
  }
}
