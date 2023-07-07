import { QueryResult } from 'pg';
import { Trip } from '@/modules/trips/models/Trip';
import { UpdateTripDTO } from '@/modules/trips/dtos/UpdateTripDTO';
import { CreateTripDTO } from '@/modules/trips/dtos/CreateTripDTO';

export interface ITripRepository {
    createTable(): Promise<QueryResult<any>>;
    getById(id: string): Promise<Trip | null>;
    deleteById(id: string): Promise<void | null>;
    updateById(data: UpdateTripDTO): Promise<Trip | null>;
    create(data: CreateTripDTO): Promise<Trip>;
}
