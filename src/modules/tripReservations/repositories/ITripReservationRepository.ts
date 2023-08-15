import { QueryResult } from 'pg';
import { TripReservation } from '@/modules/tripReservations/models/TripReservation';
import { ReserveTripDTO } from '@/modules/tripReservations/dtos/ReserveTripDTO';

export interface ITripReservationRepository {
    createTable(): Promise<QueryResult<any>>;
    getById(userId: string): Promise<TripReservation | null>;
    getByDateRange(id: string, startDate: Date, endDate: Date): Promise<TripReservation | null>;
    create(data: ReserveTripDTO): Promise<TripReservation>;
    getAll(userId: string): Promise<TripReservation[]>;
}
