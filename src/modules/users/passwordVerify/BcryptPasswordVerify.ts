import { match } from '@/shared/utils/passwordUtils';
import { IPasswordVerify } from './IPasswordVerify';

export class BcryptPasswordVerify implements IPasswordVerify {
    async verify(password: string, hashedPassword: string): Promise<boolean> {
        return match(password, hashedPassword);
    }
}
