import { QueryResult } from 'pg';
import { Trip } from '@/modules/trips/models/Trip';
import { UpdateTripDTO } from '@/modules/trips/updateTrip/UpdateTripDTO';
import { CreateTripDTO } from '@/modules/trips/createTrip/CreateTripDTO';
import { SearchTripDTO } from '@/modules/trips/searchTrip/SearchTripDTO';

export interface ITripRepository {
    createTable(): Promise<QueryResult>;

    insert(data: CreateTripDTO): Promise<Trip>;

    insertMany(data: CreateTripDTO[]): Promise<Trip[]>;

    getById(id: string): Promise<Trip | null>;

    getAllByIds(ids: string[]): Promise<Trip[]>;

    searchMany(data: SearchTripDTO): Promise<Trip[]>;

    updateById(data: UpdateTripDTO): Promise<Trip | null>;

    deleteById(id: string): Promise<void | null>;

    deleteAll(): Promise<void | null>;
}
