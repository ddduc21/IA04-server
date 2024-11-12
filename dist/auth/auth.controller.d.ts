import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, string>): Promise<{
        user: {
            id: import("mongoose").Types.ObjectId;
            username: string;
            email: string;
        };
        access_token: string;
    }>;
    register(registerDto: Record<string, string>): Promise<{
        id: import("mongoose").Types.ObjectId;
        username: string;
        email: string;
    }>;
}
