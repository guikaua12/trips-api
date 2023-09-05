import { afterAll, beforeAll, beforeEach, describe, expect, test } from '@jest/globals';
import { connect } from '@/shared/database';
import { ReserveTripDTO } from '@/modules/tripReservations/reserveTrip/ReserveTripDTO';
import { tripRepository, tripReservationRepository, userRepository } from '@/shared/repositories';
import { data } from '@/shared/seed';
import { Trip } from '@/modules/trips/models/Trip';
import { User } from '@/modules/users/models/User';
import { UpdateTripReservationDTO } from '@/modules/tripReservations/updateTripReservation/UpdateTripReservationDTO';

beforeAll(async () => {
    await connect();
    await userRepository!.deleteAll();
    await tripReservationRepository!.deleteAll();
    await tripRepository!.deleteAll();
});

describe('final limit', () => {
    test('final limit should be correct', () => {
        const limit = 10;
        const page_start = 2;
        const page_end = 8;

        const finalLimit = (page_end - (page_start - 1)) * limit;

        expect(finalLimit).toBe(70);
    });
});

describe('crud methods', () => {
    let trip: Trip | undefined;
    let user: User | undefined;

    beforeAll(async () => {
        trip = await tripRepository!.insert(data[0]);
        user = await userRepository!.insert({ email: 'john@doe.com', password: '123' });
    });

    beforeEach(async () => {
        await tripReservationRepository!.deleteAll();
    });

    test('should create a trip reservation', async () => {
        const dto: ReserveTripDTO = {
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        };

        const createdTripReservation = await tripReservationRepository!.insert(dto);

        expect(createdTripReservation).toBeDefined();
        expect(createdTripReservation.tripId).toEqual(dto.tripId);
        expect(createdTripReservation.userId).toEqual(dto.userId);
        expect(createdTripReservation.totalPaid).toEqual(dto.totalPaid);
    });

    test('should get a trip reservation by id', async () => {
        const dto: ReserveTripDTO = {
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        };

        const createdTripReservation = await tripReservationRepository!.insert(dto);

        const tripReservation = await tripReservationRepository!.getById(createdTripReservation.id);

        expect(tripReservation).toEqual(createdTripReservation);
    });

    test('should return a trip FOUND between a date range', async () => {
        const dto: ReserveTripDTO = {
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        };

        const createdTripReservation = await tripReservationRepository!.insert(dto);

        const tripReservation1 = await tripReservationRepository!.getByDateRange(
            trip!.id,
            new Date('2023-08-31'),
            new Date('2023-09-06')
        );

        expect(tripReservation1).toEqual(createdTripReservation);

        const tripReservation2 = await tripReservationRepository!.getByDateRange(
            trip!.id,
            new Date('2023-09-05'),
            new Date('2023-09-08')
        );

        expect(tripReservation2).toEqual(createdTripReservation);
    });

    test('should return null for a trip NOT found between a date range', async () => {
        const dto: ReserveTripDTO = {
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        };

        await tripReservationRepository!.insert(dto);

        const tripReservation1 = await tripReservationRepository!.getByDateRange(
            trip!.id,
            new Date('2023-08-29'),
            new Date('2023-08-31')
        );

        expect(tripReservation1).toBeNull();

        const tripReservation4 = await tripReservationRepository!.getByDateRange(
            trip!.id,
            new Date('2023-09-06'),
            new Date('2023-09-08')
        );

        expect(tripReservation4).toBeNull();
    });

    test('should update a trip reservation', async () => {
        const dto: ReserveTripDTO = {
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        };

        const createdTripReservation = await tripReservationRepository!.insert(dto);

        expect(createdTripReservation.status).toEqual('confirmed');

        const updateDto: UpdateTripReservationDTO = {
            id: createdTripReservation.id,
            userId: user!.id,
            status: 'pending',
        };

        const updatedTripReservation = await tripReservationRepository!.update(updateDto);

        expect(updatedTripReservation?.status).toEqual('pending');
    });

    test('should get all trip reservations of a user by id', async () => {
        const tripReservation1 = await tripReservationRepository!.insert({
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });
        const tripReservation2 = await tripReservationRepository!.insert({
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });

        const tripReservations = await tripReservationRepository!.getAllByUserId(user!.id);

        expect(tripReservations).toContainEqual(tripReservation1);
        expect(tripReservations).toContainEqual(tripReservation2);
    });

    test('should get all trip reservations of a user using pagination', async () => {
        const createdTripReservation1 = await tripReservationRepository!.insert({
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });
        const createdTripReservation2 = await tripReservationRepository!.insert({
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });

        const tripReservations = await tripReservationRepository!.searchMany({
            id: user!.id,
            limit: 10,
            page_start: 1,
            page_end: 1,
            sort_by: 'createdAt',
            sort_dir: 'desc',
        });

        expect(tripReservations).toContainEqual(createdTripReservation1);
        expect(tripReservations).toContainEqual(createdTripReservation2);
    });
});

afterAll(async () => {
    await userRepository!.deleteAll();
    await tripReservationRepository!.deleteAll();
    await tripRepository!.deleteAll();
});
