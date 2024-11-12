import { Request } from 'express';
export declare class ProfileService {
    private request;
    constructor(request: Request);
    getProfile(): Promise<any>;
}
