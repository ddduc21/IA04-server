import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(email: string, pass: string): Promise<{
        user: {
            id: import("mongoose").Types.ObjectId;
            username: string;
            email: string;
        };
        access_token: string;
    }>;
    register(username: string, email: string, pass: string): Promise<{
        id: import("mongoose").Types.ObjectId;
        username: string;
        email: string;
    }>;
}
