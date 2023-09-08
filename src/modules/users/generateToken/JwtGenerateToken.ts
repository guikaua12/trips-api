import { generateJwt } from '@/shared/utils/jwt';
import { IGenerateToken } from './IGenerateToken';

export class JwtGenerateToken implements IGenerateToken {
    generate(data: any): string {
        return generateJwt(data);
    }
}
