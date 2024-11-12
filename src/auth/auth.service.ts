import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    if (!email) {
      throw new UnauthorizedException('Email required');
    }
    if (!pass) {
      throw new UnauthorizedException('Password required');
    }
    const user = await this.usersService.findOne('', email);
    if (!user || !bcrypt.compareSync(pass, user?.password)) {
      throw new UnauthorizedException('Wrong email or password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    return {
      user: payload,
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '10m',
      }),
    };
  }

  async register(username: string, email: string, pass: string) {
    const newUser = await this.usersService.createUser({
      email: email,
      username: username,
      password: pass,
    });
    return {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };
  }
}
