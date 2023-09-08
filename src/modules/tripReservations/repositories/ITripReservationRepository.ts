import { TripReservation } from '@/modules/tripReservations/models/TripReservation';
import { ReserveTripDTO } from '@/modules/tripReservations/reserveTrip/dto';
import { UpdateTripReservationDTO } from '@/modules/tripReservations/updateTripReservation/dto';
import { GetAllTripReservationDTOOutput } from '@/modules/tripReservations/getAllTripReservation/dto';

export interface ITripReservationRepository {
    createTable(): Promise<void>;

    insert(data: ReserveTripDTO): Promise<TripReservation>;

    getById(id: string): Promise<TripReservation | null>;

    getByDateRange(tripId: string, startDate: Date, endDate: Date): Promise<TripReservation | null>;

    getAllByUserId(userId: string): Promise<TripReservation[]>;

    searchMany(data: GetAllTripReservationDTOOutput): Promise<TripReservation[]>;

    update(data: UpdateTripReservationDTO): Promise<TripReservation | null>;

    deleteAll(): Promise<void | null>;
}
