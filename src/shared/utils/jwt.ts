const jwt = require('jsonwebtoken');

export function generateJwt(data: any): string {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 1800 });
}

export function parse(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET);
}
