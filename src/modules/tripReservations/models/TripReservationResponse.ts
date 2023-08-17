import { Trip } from '@/modules/trips/models/Trip';

export type TripReservationResponse = {
    id: string;
    trip: Trip;
    userId: string;
    startDate: Date;
    endDate: Date;
    totalPaid: number;
    status: 'pending' | 'confirmed' | 'cancelled';
};
