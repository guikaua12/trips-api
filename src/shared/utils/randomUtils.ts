import crypto from 'crypto';

export function randomHash(): string {
    return crypto.randomBytes(16).toString('hex');
}
