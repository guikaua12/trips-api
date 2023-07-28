import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { Pool, QueryResult } from 'pg';
import { CreateUserDTO } from '@/modules/users/dtos/CreateUserDTO';
import { User } from '@/modules/users/models/User';
import { pool } from '@/shared/database';
import { v4 } from 'uuid';

export class UserRepository implements IUserRepository {
    public static TABLE_NAME = 'users';
    constructor(private pool: Pool) {}

    async createTable(): Promise<QueryResult<any>> {
        return this.pool.query(
            `CREATE TABLE IF NOT EXISTS ${UserRepository.TABLE_NAME} (` +
                '"id" VARCHAR PRIMARY KEY, ' +
                '"email" VARCHAR, ' +
                '"password" VARCHAR' +
                ')'
        );
    }

    async create(data: CreateUserDTO): Promise<User> {
        const uuid = v4();

        const result = await pool.query<User>(
            `INSERT INTO ${UserRepository.TABLE_NAME} ("id", "email", "password") VALUES ($1, $2, $3) RETURNING *`,
            [uuid, data.email, data.password]
        );

        return result.rows[0];
    }

    async deleteById(id: string): Promise<void | null> {
        await pool.query(
            `DELETE
                          FROM ${UserRepository.TABLE_NAME}
                          WHERE "id" = $1`,
            [id]
        );
    }

    async getById(id: string): Promise<User | null> {
        const result = await pool.query<User>(`SELECT * FROM ${UserRepository.TABLE_NAME} WHERE "id" = $1`, [id]);

        return result.rows[0] || null;
    }
}
