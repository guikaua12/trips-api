import { data } from '@/seed/data';
import { connect, disconnect } from '@/shared/database';
import { tripRepository, tripReservationRepository, userRepository } from '@/shared/repositories';
import { describe, test, expect, beforeAll, beforeEach, afterAll } from '@jest/globals';
import { GetAllTripReservationUseCase } from './GetAllTripReservationUseCase';

beforeAll(async () => {
    await connect();
});

describe('GetAllTripReservationUseCase test', () => {
    let getAllTripReservationUseCase: GetAllTripReservationUseCase;

    beforeEach(async () => {
        userRepository!.deleteAll();
        tripRepository!.deleteAll();
        tripReservationRepository!.deleteAll();
        getAllTripReservationUseCase = new GetAllTripReservationUseCase(tripReservationRepository!, tripRepository!);
    });

    test('should have defined properties', async () => {
        const trip = await tripRepository!.insert(data[0]);
        const user = await userRepository!.insert({
            email: 'jhon@doe.com',
            password: '123',
        });
        const tripReservation1 = await tripReservationRepository!.insert({
            tripId: trip.id,
            userId: user.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });

        const tripReservation2 = await tripReservationRepository!.insert({
            tripId: trip.id,
            userId: user.id,
            startDate: new Date('2023-09-06'),
            endDate: new Date('2023-09-10'),
            totalPaid: 150,
        });

        const response = await getAllTripReservationUseCase!.execute({
            id: user.id,
            limit: 10,
            page_start: 1,
            page_end: 1,
            sort_by: 'createdAt',
            sort_dir: 'desc',
        });

        expect(response).toBeDefined();
        expect(response).toHaveProperty('tripReservations');
        expect(response).toHaveProperty('pages');
    });

    test('should get all trip reservations', async () => {
        const trip = await tripRepository!.insert(data[0]);
        const user = await userRepository!.insert({
            email: 'jhon@doe.com',
            password: '123',
        });
        const tripReservation1 = await tripReservationRepository!.insert({
            tripId: trip.id,
            userId: user.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });

        const tripReservation2 = await tripReservationRepository!.insert({
            tripId: trip.id,
            userId: user.id,
            startDate: new Date('2023-09-06'),
            endDate: new Date('2023-09-10'),
            totalPaid: 150,
        });

        const response = await getAllTripReservationUseCase!.execute({
            id: user.id,
            limit: 10,
            page_start: 1,
            page_end: 1,
            sort_by: 'createdAt',
            sort_dir: 'desc',
        });

        expect(response).toBeDefined();
        expect(response.pages).toEqual(1);
        expect(response.tripReservations.length).toEqual(2);
    });

    test('should return ordered trip reservations using desc', async () => {
        const trip = await tripRepository!.insert(data[0]);
        const user = await userRepository!.insert({
            email: 'jhon@doe.com',
            password: '123',
        });

        // first
        const tripReservation1 = await tripReservationRepository!.insert({
            tripId: trip.id,
            userId: user.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });

        // last
        const tripReservation2 = await tripReservationRepository!.insert({
            tripId: trip.id,
            userId: user.id,
            startDate: new Date('2023-09-06'),
            endDate: new Date('2023-09-10'),
            totalPaid: 150,
        });

        const response = await getAllTripReservationUseCase!.execute({
            id: user.id,
            limit: 10,
            page_start: 1,
            page_end: 1,
            sort_by: 'createdAt',
            sort_dir: 'desc',
        });

        expect(response).toBeDefined();
        expect(response.tripReservations[0].id).toEqual(tripReservation2.id);
        expect(response.tripReservations[1].id).toEqual(tripReservation1.id);
    });

    test('should return ordered trip reservations using asc', async () => {
        const trip = await tripRepository!.insert(data[0]);
        const user = await userRepository!.insert({
            email: 'jhon@doe.com',
            password: '123',
        });

        // first
        const tripReservation1 = await tripReservationRepository!.insert({
            tripId: trip.id,
            userId: user.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });

        // last
        const tripReservation2 = await tripReservationRepository!.insert({
            tripId: trip.id,
            userId: user.id,
            startDate: new Date('2023-09-06'),
            endDate: new Date('2023-09-10'),
            totalPaid: 150,
        });

        const response = await getAllTripReservationUseCase!.execute({
            id: user.id,
            limit: 10,
            page_start: 1,
            page_end: 1,
            sort_by: 'createdAt',
            sort_dir: 'asc',
        });

        expect(response).toBeDefined();
        expect(response.tripReservations[0].id).toEqual(tripReservation1.id);
        expect(response.tripReservations[1].id).toEqual(tripReservation2.id);
    });
});

afterAll(async () => {
    userRepository!.deleteAll();
    tripRepository!.deleteAll();
    tripReservationRepository!.deleteAll();
    disconnect();
});
