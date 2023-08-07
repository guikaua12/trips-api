import jwt from 'jsonwebtoken';
import * as process from 'process';

export type TokenType = {
    id: string;
};

export function generateJwt(data: TokenType): string {
    return jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRY });
}

export function parse(token: string): TokenType {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenType;
}
