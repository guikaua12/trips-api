import { TripReservationWithTrip } from '../models/TripReservationWithTrip';

export type GetAllTripReservationReponse = {
    tripReservations: TripReservationWithTrip[];
    pages: number;
};
