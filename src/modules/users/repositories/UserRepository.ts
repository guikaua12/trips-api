import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { Pool, QueryResult } from 'pg';
import { RegisterUserDTO } from '@/modules/users/registerUser/RegisterUserDTO';
import { User } from '@/modules/users/models/User';
import { pool } from '@/shared/database';
import { v4 } from 'uuid';
import { hash } from '@/shared/utils/passwordUtils';
import { SearchUserDTO } from '@/modules/users/searchUser/SearchUserDTO';

export class UserRepository implements IUserRepository {
    public static TABLE_NAME = 'users';
    constructor(private pool: Pool) {}

    async createTable(): Promise<QueryResult> {
        return this.pool.query(
            `CREATE TABLE IF NOT EXISTS ${UserRepository.TABLE_NAME} (
                "id" VARCHAR NOT NULL PRIMARY KEY,
                "email" VARCHAR NOT NULL, 
                "password" VARCHAR NOT NULL
            )`
        );
    }

    async insert(data: RegisterUserDTO): Promise<User> {
        const uuid = v4();
        const hashedPassword = await hash(data.password);

        const result = await pool.query<User>(
            `INSERT INTO ${UserRepository.TABLE_NAME} ("id", "email", "password") VALUES ($1, $2, $3) RETURNING *`,
            [uuid, data.email, hashedPassword]
        );

        return result.rows[0];
    }

    async search({ id, email }: SearchUserDTO): Promise<User | null> {
        const query: string[] = [];

        if (id && id.trim().length) {
            query.push(`"id" = '${id}'`);
        }

        if (email && email.trim().length) {
            query.push(`"email" = '${email}'`);
        }

        if (!query.length) return null;

        const result = await this.pool.query<User>(
            `SELECT * FROM ${UserRepository.TABLE_NAME} WHERE ${query.join(' AND ')}`
        );

        return result.rows[0] || null;
    }

    async deleteById(id: string): Promise<void | null> {
        await pool.query(
            `DELETE
                          FROM ${UserRepository.TABLE_NAME}
                          WHERE "id" = $1`,
            [id]
        );
    }

    async deleteAll(): Promise<void | null> {
        await pool.query(`DELETE FROM ${UserRepository.TABLE_NAME};`);
    }
}
