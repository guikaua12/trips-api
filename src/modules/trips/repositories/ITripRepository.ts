import { QueryResult } from 'pg';
import { Trip } from '@/modules/trips/models/Trip';

export interface ITripRepository {
    createTable(): Promise<QueryResult<any>>;
}
