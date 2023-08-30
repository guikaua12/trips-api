import { QueryResult } from 'pg';
import { Trip } from '@/modules/trips/models/Trip';
import { UpdateTripDTO } from '@/modules/trips/updateTrip/UpdateTripDTO';
import { CreateTripDTO } from '@/modules/trips/createTrip/CreateTripDTO';
import { SearchTripDTO } from '@/modules/trips/searchTrip/SearchTripDTO';

export interface ITripRepository {
    createTable(): Promise<QueryResult<any>>;
    search(data: SearchTripDTO): Promise<Trip[]>;
    getById(id: string): Promise<Trip | null>;
    deleteById(id: string): Promise<void | null>;
    updateById(data: UpdateTripDTO): Promise<Trip | null>;
    create(data: CreateTripDTO): Promise<Trip>;
    createMany(data: CreateTripDTO[]): Promise<Trip[]>;
    getAllByIds(ids: string[]): Promise<Trip[]>;
}
