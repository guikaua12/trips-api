import { QueryResult } from 'pg';
import { Session } from '@/modules/sessions/models/Session';

export interface ISessionRepository {
    createTable(): Promise<QueryResult<any>>;
    create(session: Session): Promise<Session>;
    delete(session: string): Promise<void>;
    find(session: string): Promise<Session | null>;
    findValid(session: string, time: string): Promise<Session | null>;
}
