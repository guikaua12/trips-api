const bcrypt = require('bcrypt');

export async function hash(password: string) {
    const salt = await bcrypt.genSalt(13);
    return await bcrypt.hash(password, salt);
}

export async function match(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}
