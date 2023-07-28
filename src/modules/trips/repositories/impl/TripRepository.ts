import { ITripRepository } from '@/modules/trips/repositories/ITripRepository';
import { Pool, QueryResult } from 'pg';
import { Trip } from '@/modules/trips/models/Trip';
import { UpdateTripDTO } from '@/modules/trips/dtos/UpdateTripDTO';
import { CreateTripDTO } from '@/modules/trips/dtos/CreateTripDTO';
import { v4 } from 'uuid';
import { SearchTripDTO } from '@/modules/trips/dtos/SearchTripDTO';

export class TripRepository implements ITripRepository {
    static TABLE_NAME = 'trips';
    pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async createTable(): Promise<QueryResult<any>> {
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

    async search({ location, startDate, pricePerDay, recommended }: SearchTripDTO): Promise<Trip[]> {
        const query: string[] = [];

        if (location && location.trim().length) {
            query.push(`"location" LIKE '${location}'`);
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

    async getById(id: string): Promise<Trip | null> {
        const result = await this.pool.query<Trip>(`SELECT * FROM ${TripRepository.TABLE_NAME} WHERE id = $1`, [id]);

        const trip = result.rows[0];

        return trip || null;
    }
    async deleteById(id: string): Promise<void | null> {
        await this.pool.query(`DELETE FROM ${TripRepository.TABLE_NAME} WHERE id = $1`, [id]);
    }
    async updateById(data: UpdateTripDTO): Promise<Trip | null> {
        const query: string[] = [];

        for (let key in data) {
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
    async create(data: CreateTripDTO): Promise<Trip> {
        const uuid = v4();

        const result = await this.pool.query<Trip>(
            `INSERT INTO ${TripRepository.TABLE_NAME} (id, name, location, description, startDate, endDate, pricePerDay, coverImage, imagesUrl, highlights, maxGuests, countryCode, recommended) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
            [
                uuid,
                data.name,
                data.description,
                data.location,
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
}
