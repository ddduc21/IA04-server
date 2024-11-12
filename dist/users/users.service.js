"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(user) {
        if (!user.email) {
            throw new common_1.HttpException('Email not found', 400);
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/.test(user.email)) {
            throw new common_1.HttpException('Invalid email format', 400);
        }
        if (!user.username) {
            throw new common_1.HttpException('Username not found', 400);
        }
        else if (user.username.length < 4) {
            throw new common_1.HttpException('Username too short (<4 characters)', 400);
        }
        else if (user.username.length > 20) {
            throw new common_1.HttpException('Username too long (>20 characters)', 400);
        }
        if (!user.password) {
            throw new common_1.HttpException('Password not found', 400);
        }
        else if (user.password.length < 8) {
            throw new common_1.HttpException('Password too short (<8 characters)', 400);
        }
        else if (user.password.length > 32) {
            throw new common_1.HttpException('Password too long (>32 characters)', 400);
        }
        const existUser = await this.findOne(user.username, user.email);
        if (user.username === existUser?.username) {
            throw new common_1.HttpException('Username exist', 400);
        }
        if (user.email === existUser?.email) {
            throw new common_1.HttpException('Email exist', 400);
        }
        user.password = bcrypt.hashSync(user.password, 10);
        const newUser = new this.userModel(user);
        await newUser.save();
        return newUser;
    }
    async findOne(username, email) {
        return await this.userModel.findOne({
            $or: [{ username: username }, { email: email }],
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map