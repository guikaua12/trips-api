export type TripReservation = {
    id: string;
    tripId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    totalPaid: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: Date;
};
