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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signIn(email, pass) {
        if (!email) {
            throw new common_1.UnauthorizedException('Email required');
        }
        if (!pass) {
            throw new common_1.UnauthorizedException('Password required');
        }
        const user = await this.usersService.findOne('', email);
        if (!user || !bcrypt.compareSync(pass, user?.password)) {
            throw new common_1.UnauthorizedException('Wrong email or password');
        }
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
    async register(username, email, pass) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map