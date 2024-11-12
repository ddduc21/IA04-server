import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: User): Promise<UserDocument> {
    if (!user.email) {
      throw new HttpException('Email not found', 400);
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/.test(user.email)) {
      throw new HttpException('Invalid email format', 400);
    }

    if (!user.username) {
      throw new HttpException('Username not found', 400);
    } else if (user.username.length < 4) {
      throw new HttpException('Username too short (<4 characters)', 400);
    } else if (user.username.length > 20) {
      throw new HttpException('Username too long (>20 characters)', 400);
    }

    if (!user.password) {
      throw new HttpException('Password not found', 400);
    } else if (user.password.length < 8) {
      throw new HttpException('Password too short (<8 characters)', 400);
    } else if (user.password.length > 32) {
      throw new HttpException('Password too long (>32 characters)', 400);
    }

    const existUser = await this.findOne(user.username, user.email);
    if (user.username === existUser?.username) {
      throw new HttpException('Username exist', 400);
    }
    if (user.email === existUser?.email) {
      throw new HttpException('Email exist', 400);
    }

    user.password = bcrypt.hashSync(user.password, 10);
    const newUser = new this.userModel(user);
    await newUser.save();
    return newUser;
  }

  async findOne(
    username: string,
    email: string,
  ): Promise<UserDocument | undefined> {
    return await this.userModel.findOne({
      $or: [{ username: username }, { email: email }],
    });
  }
}
