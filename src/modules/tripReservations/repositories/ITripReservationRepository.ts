import { QueryResult } from 'pg';
import { TripReservation } from '@/modules/tripReservations/models/TripReservation';
import { ReserveTripDTO } from '@/modules/tripReservations/reserveTrip/ReserveTripDTO';
import { UpdateTripReservationDTO } from '@/modules/tripReservations/updateTripReservation/UpdateTripReservationDTO';
import { GetAllTripReservationDTOOutput } from '@/modules/tripReservations/getAllTripReservation/GetAllTripReservationDTO';

export interface ITripReservationRepository {
    createTable(): Promise<QueryResult>;

    insert(data: ReserveTripDTO): Promise<TripReservation>;

    getById(id: string): Promise<TripReservation | null>;

    getByDateRange(tripId: string, startDate: Date, endDate: Date): Promise<TripReservation | null>;

    getAllByUserId(userId: string): Promise<TripReservation[]>;

    searchMany(data: GetAllTripReservationDTOOutput): Promise<TripReservation[]>;

    update(data: UpdateTripReservationDTO): Promise<TripReservation | null>;

    deleteAll(): Promise<void | null>;
}
