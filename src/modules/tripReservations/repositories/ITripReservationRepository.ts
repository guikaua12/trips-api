import { QueryResult } from 'pg';
import { TripReservation } from '@/modules/tripReservations/models/TripReservation';
import { ReserveTripDTO } from '@/modules/tripReservations/reserveTrip/ReserveTripDTO';
import { UpdateTripReservationDTO } from '@/modules/tripReservations/updateTripReservation/UpdateTripReservationDTO';
import { GetAllTripReservationDTO } from '@/modules/tripReservations/getAllTripReservation/GetAllTripReservationDTO';

export interface ITripReservationRepository {
    createTable(): Promise<QueryResult<any>>;
    getById(id: string): Promise<TripReservation | null>;
    getByDateRange(id: string, startDate: Date, endDate: Date): Promise<TripReservation | null>;
    create(data: ReserveTripDTO): Promise<TripReservation>;
    update(data: UpdateTripReservationDTO): Promise<TripReservation | null>;
    getAll(data: GetAllTripReservationDTO): Promise<TripReservation[]>;
    getAllById(userId: string): Promise<TripReservation[]>;
}
