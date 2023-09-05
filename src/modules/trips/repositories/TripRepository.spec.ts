import { connect } from '@/shared/database';

import { test, expect, beforeAll, afterAll } from '@jest/globals';
import { tripRepository } from '@/shared/repositories';
import { data } from '@/shared/seed';

beforeAll(async () => {
    await connect();
    await tripRepository!.deleteAll();
    await tripRepository!.createMany(data);
});

test('getAllByIds works', async () => {
    const trips = await tripRepository!.getAllByIds(['1', 'b5b08318-0ffd-4587-9f05-a2965cc7a9ac']);

    expect(trips.length).toBe(1);
});

test('search by location works', async () => {
    let trips = await tripRepository!.search({ location: 'Hotel' });
    expect(trips.length).toBe(2);

    trips = await tripRepository!.search({ location: 'hotel aurora' });
    expect(trips.length).toBe(1);

    trips = await tripRepository!.search({ location: 'italia' });
    expect(trips.length).toBe(2);
});

test('search by pricePerDay works', async () => {
    let trips = await tripRepository!.search({ pricePerDay: 700 });
    expect(trips.length).toBe(9);

    trips = await tripRepository!.search({ pricePerDay: 300 });
    expect(trips.length).toBe(4);

    trips = await tripRepository!.search({ pricePerDay: 250 });
    expect(trips.length).toBe(3);
});

test('search by recommended works', async () => {
    let trips = await tripRepository!.search({ recommended: true });
    expect(trips.length).toBe(4);

    trips = await tripRepository!.search({ recommended: false });
    expect(trips.length).toBe(5);
});

test('get by id works', async () => {
    const trip = await tripRepository!.getById('b5b08318-0ffd-4587-9f05-a2965cc7a9ac');

    expect(trip).toBeDefined();
    expect(trip?.id).toEqual('b5b08318-0ffd-4587-9f05-a2965cc7a9ac');
    expect(trip?.name).toEqual('Hotel Aurora');
    expect(trip?.location).toEqual('Amalfi, Itália');
    expect(trip?.countryCode).toEqual('IT');
    expect(trip?.imagesUrl).toEqual([
        'https://images.unsplash.com/photo-1538683270504-3d09ad7ae739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        'https://images.unsplash.com/photo-1528215747454-3d0e0902fff2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
        'https://images.unsplash.com/photo-1534612899740-55c821a90129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ]);
    expect(trip?.pricePerDay).toEqual(250);
    expect(trip?.highlights).toEqual([
        'Café da manhã incluso',
        'Piscina',
        'Wifi grátis',
        'Estacionamento grátis',
        'Vista paradisíaca',
        'Luxuoso',
    ]);
    expect(trip?.recommended).toEqual(true);
    expect(trip?.maxGuests).toEqual(5);
});

test('create works', async () => {
    const dto = {
        id: 'c25828ad-a079-4572-8b09-c4158ac95a47',
        name: 'Some hotel',
        description: 'Some description',
        startDate: new Date('2023-07-03'),
        endDate: new Date('2023-07-30'),
        location: 'Some location',
        countryCode: 'BR',
        coverImage:
            'https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=M3wxMA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        imagesUrl: [
            'https://images.unsplash.com/photo-1538683270504-3d09ad7ae739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        ],
        pricePerDay: 1337,
        highlights: [
            'Café da manhã incluso',
            'Piscina',
            'Wifi grátis',
            'Estacionamento grátis',
            'Vista paradisíaca',
            'Luxuoso',
        ],
        recommended: false,
        maxGuests: 10,
    };

    const trip = await tripRepository!.create(dto);

    expect(trip).toBeDefined();
    expect(trip?.id).toEqual(dto.id);
    expect(trip?.name).toEqual(dto.name);
    expect(trip?.location).toEqual(dto.location);
    expect(trip?.countryCode).toEqual(dto.countryCode);
    expect(trip?.imagesUrl).toEqual(dto.imagesUrl);
    expect(trip?.pricePerDay).toEqual(dto.pricePerDay);
    expect(trip?.highlights).toEqual(dto.highlights);
    expect(trip?.recommended).toEqual(dto.recommended);
    expect(trip?.maxGuests).toEqual(dto.maxGuests);
});

afterAll(async () => {
    await tripRepository!.deleteAll();
});
