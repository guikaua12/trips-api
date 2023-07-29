import { IUserRepository } from '@/modules/users/repositories/IUserRepository';
import { Pool, QueryResult } from 'pg';
import { ISessionRepository } from '@/modules/sessions/repositories/ISessionRepository';
import { Session } from '@/modules/sessions/models/Session';
import { CreateSessionDTO } from '@/modules/sessions/dtos/CreateSessionDTO';
import { UserRepository } from '@/modules/users/repositories/UserRepository';

export class SessionRepository implements ISessionRepository {
    public static TABLE_NAME = 'sessions';
    constructor(private pool: Pool) {}

    async createTable(): Promise<QueryResult<any>> {
        return this.pool.query(`CREATE TABLE IF NOT EXISTS ${SessionRepository.TABLE_NAME} (
            "session" VARCHAR PRIMARY KEY, 
            "user_id" VARCHAR NOT NULL , 
            "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY ("user_id") REFERENCES ${UserRepository.TABLE_NAME} ("id")
        )`);
    }

    async create({ session, user_id }: CreateSessionDTO): Promise<Session> {
        const result = await this.pool.query<Session>(
            `INSERT INTO ${SessionRepository.TABLE_NAME} ("session", "user_id") VALUES ($1, $2) RETURNING *`,
            [session, user_id]
        );

        return result.rows[0];
    }

    async delete(session: string): Promise<void> {
        await this.pool.query(`DELETE FROM ${SessionRepository.TABLE_NAME} WHERE "session" = $1`, [session]);
    }

    async find(session: string): Promise<Session | null> {
        const result = await this.pool.query<Session>(
            `SELECT * FROM ${SessionRepository.TABLE_NAME} WHERE "session" = $1`,
            [session]
        );

        return result.rows[0];
    }

    async findValid(session: string, time: string): Promise<Session | null> {
        const result = await this.pool.query<Session>(
            `SELECT * FROM ${SessionRepository.TABLE_NAME} WHERE "session" = $1 AND "updated_at" > NOW() - INTERVAL '${time}'`,
            [session]
        );

        return result.rows[0] || null;
    }
}
