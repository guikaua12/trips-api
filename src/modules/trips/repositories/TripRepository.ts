import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { Pool, QueryResult } from 'pg';
import { Trip } from '@/modules/trips/models/Trip';
import { UpdateTripDTO } from '@/modules/trips/updateTrip/UpdateTripDTO';
import { CreateTripDTO } from '@/modules/trips/createTrip/CreateTripDTO';
import { v4 } from 'uuid';
import { SearchTripDTO } from '@/modules/trips/searchTrip/SearchTripDTO';

export class TripRepository implements ITripRepository {
    static TABLE_NAME = 'trips';
    pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async createTable(): Promise<QueryResult> {
        return this.pool.query(
            `CREATE TABLE IF NOT EXISTS ${TripRepository.TABLE_NAME} (` +
                '"id" VARCHAR PRIMARY KEY, ' +
                '"name" VARCHAR, ' +
                '"location" VARCHAR,' +
                '"description" VARCHAR, ' +
                '"startDate" DATE, ' +
                '"endDate" DATE, ' +
                '"pricePerDay" DECIMAL(8,2), ' +
                '"coverImage" VARCHAR, ' +
                '"imagesUrl" VARCHAR[], ' +
                '"highlights" VARCHAR[], ' +
                '"maxGuests" INTEGER,' +
                '"countryCode" VARCHAR,' +
                '"recommended" BOOLEAN DEFAULT FALSE' +
                ')'
        );
    }

    async insert(data: CreateTripDTO): Promise<Trip> {
        const uuid = data.id || v4();

        const result = await this.pool.query<Trip>(
            `INSERT INTO ${TripRepository.TABLE_NAME} ("id", "name", "location", "description", "startDate", "endDate", "pricePerDay", "coverImage", "imagesUrl", "highlights", "maxGuests", "countryCode", "recommended") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
            [
                uuid,
                data.name,
                data.location,
                data.description,
                data.startDate,
                data.endDate,
                data.pricePerDay,
                data.coverImage,
                data.imagesUrl,
                data.highlights,
                data.maxGuests,
                data.countryCode,
                data.recommended,
            ]
        );

        return result.rows[0];
    }

    async insertMany(data: CreateTripDTO[]): Promise<Trip[]> {
        const trips: Trip[] = [];

        for (const dto of data) {
            const result = await this.insert(dto);
            trips.push(result);
        }

        return trips;
    }
    async getById(id: string): Promise<Trip | null> {
        const result = await this.pool.query<Trip>(`SELECT * FROM ${TripRepository.TABLE_NAME} WHERE id = $1`, [id]);

        const trip = result.rows[0];

        return trip || null;
    }

    async getAllByIds(ids: string[]): Promise<Trip[]> {
        const result = await this.pool.query<Trip>(`SELECT * FROM ${TripRepository.TABLE_NAME} WHERE id = ANY($1)`, [
            ids,
        ]);

        return result.rows;
    }

    async searchMany({ location, startDate, pricePerDay, recommended }: SearchTripDTO): Promise<Trip[]> {
        const query: string[] = [];

        if (location && location.trim().length) {
            query.push(
                `unaccent("location") ILIKE '%${location}%' OR unaccent("countryCode") ILIKE '%${location}%' OR unaccent("name") ILIKE '%${location}%'`
            );
        }

        if (pricePerDay) {
            query.push(`"pricePerDay" <= '${pricePerDay}'`);
        }

        if (typeof recommended !== 'undefined') {
            query.push(`"recommended" = '${recommended}'`);
        }

        if (query.length === 0) return [];

        const result = await this.pool.query<Trip>(
            `SELECT * FROM ${TripRepository.TABLE_NAME} WHERE ${query.join(' AND ')}`
        );

        return result.rows;
    }
    async updateById(data: UpdateTripDTO): Promise<Trip | null> {
        const query: string[] = [];

        for (const key in data) {
            // ignore id
            if (key === 'id') continue;

            // @ts-ignore
            query.push(`${key} = '${data[key]}'`);
        }

        const result = await this.pool.query<Trip>(
            `UPDATE ${TripRepository.TABLE_NAME} SET ${query.join(', ')} WHERE id = $1 RETURNING *`,
            [data.id]
        );

        return result.rows[0] || null;
    }
    async deleteById(id: string): Promise<void | null> {
        await this.pool.query(`DELETE FROM ${TripRepository.TABLE_NAME} WHERE id = $1`, [id]);
    }

    async deleteAll(): Promise<void | null> {
        await this.pool.query(`DELETE FROM ${TripRepository.TABLE_NAME};`);
    }
}
