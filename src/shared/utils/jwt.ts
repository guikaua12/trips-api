import jwt from 'jsonwebtoken';
import { env } from '@/dotenv';

export type TokenType = {
    id: string;
};

export function generateJwt(data: TokenType): string {
    return jwt.sign(data, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRY });
}

export function parse(token: string): TokenType {
    return jwt.verify(token, env.JWT_SECRET) as TokenType;
}
