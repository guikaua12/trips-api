import { Trip } from '@/modules/trips/models/Trip';
import { TripReservation } from '@/modules/tripReservations/models/TripReservation';

export interface TripReservationWithTrip extends Omit<TripReservation, 'tripId'> {
    trip: Trip;
}
