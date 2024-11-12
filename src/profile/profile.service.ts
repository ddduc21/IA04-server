import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class ProfileService {
  constructor(@Inject(REQUEST) private request: Request) {}

  async getProfile() {
    const user = this.request['user'];
    return user;
  }
}
