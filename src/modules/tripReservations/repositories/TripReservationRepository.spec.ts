import { test, expect, describe, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { connect } from '@/shared/database';
import { ReserveTripDTO } from '@/modules/tripReservations/reserveTrip/ReserveTripDTO';
import { tripRepository, tripReservationRepository, userRepository } from '@/shared/repositories';
import { data } from '@/shared/seed';
import { Trip } from '@/modules/trips/models/Trip';
import { User } from '@/modules/users/models/User';
import { UpdateTripDTO } from '@/modules/trips/updateTrip/UpdateTripDTO';
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
        trip = await tripRepository!.create(data[0]);
        user = await userRepository!.create({ email: 'john@doe.com', password: '123' });
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

        const createdTripReservation = await tripReservationRepository!.create(dto);

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

        const createdTripReservation = await tripReservationRepository!.create(dto);

        const tripReservation = await tripReservationRepository!.getById(createdTripReservation.id);

        expect(tripReservation).toEqual(createdTripReservation);
    });

    test('should get all trip reservations by user id', async () => {
        const dto: ReserveTripDTO = {
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        };

        await tripReservationRepository!.create(dto);

        const tripReservations = await tripReservationRepository!.getAllById(user!.id);

        expect(tripReservations.length).toEqual(1);
    });

    test('should get a trip reservation by date range', async () => {
        const dto: ReserveTripDTO = {
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        };

        const createdTripReservation = await tripReservationRepository!.create(dto);

        const tripReservation1 = await tripReservationRepository!.getByDateRange(
            trip!.id,
            new Date('2023-08-29'),
            new Date('2023-08-31')
        );

        expect(tripReservation1).toBeNull();

        const tripReservation2 = await tripReservationRepository!.getByDateRange(
            trip!.id,
            new Date('2023-08-31'),
            new Date('2023-09-06')
        );

        expect(tripReservation2).toEqual(createdTripReservation);

        const tripReservation3 = await tripReservationRepository!.getByDateRange(
            trip!.id,
            new Date('2023-09-05'),
            new Date('2023-09-08')
        );

        expect(tripReservation3).toEqual(createdTripReservation);

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

        const createdTripReservation = await tripReservationRepository!.create(dto);

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
        await tripReservationRepository!.create({
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });
        await tripReservationRepository!.create({
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });

        const tripReservations = await tripReservationRepository!.getAllById(user!.id);

        expect(tripReservations.length).toEqual(2);
    });

    test('should get all trip reservations of a user', async () => {
        const createdTripReservation1 = await tripReservationRepository!.create({
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });
        const createdTripReservation2 = await tripReservationRepository!.create({
            tripId: trip!.id,
            userId: user!.id,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-05'),
            totalPaid: 100,
        });

        const tripReservations = await tripReservationRepository!.getAll({
            id: user!.id,
            limit: 10,
            page_start: 1,
            page_end: 1,
            sort_by: 'createdAt',
            sort_dir: 'desc',
        });

        expect(tripReservations.length).toEqual(2);
    });
});

afterAll(async () => {
    await userRepository!.deleteAll();
    await tripReservationRepository!.deleteAll();
    await tripRepository!.deleteAll();
});
