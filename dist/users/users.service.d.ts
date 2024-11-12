import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    createUser(user: User): Promise<UserDocument>;
    findOne(username: string, email: string): Promise<UserDocument | undefined>;
}
