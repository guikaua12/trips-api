import { ITripReservationRepository } from '@/modules/tripReservations/repositories/ITripReservationRepository';
import { ReserveTripDTO } from '@/modules/tripReservations/dtos/ReserveTripDTO';
import { TripReservation } from '@/modules/tripReservations/models/TripReservation';
import { Pool, QueryResult } from 'pg';
import { v4 } from 'uuid';

export class TripReservationRepository implements ITripReservationRepository {
    public static TABLE_NAME = 'trips_reservations';
    constructor(private pool: Pool) {}
    async createTable(): Promise<QueryResult<any>> {
        return this.pool.query(
            `CREATE TABLE IF NOT EXISTS ${TripReservationRepository.TABLE_NAME} ("id" VARCHAR PRIMARY KEY, "tripId" VARCHAR, "userId" VARCHAR, "startDate" DATE, "endDate" DATE, "totalPaid" DECIMAL(8,2))`
        );
    }

    async create({ tripId, userId, startDate, endDate, totalPaid }: ReserveTripDTO): Promise<TripReservation> {
        const id = v4();

        const result = await this.pool.query<TripReservation>(
            `INSERT INTO ${TripReservationRepository.TABLE_NAME} ("id", "tripId", "userId", "startDate", "endDate", "totalPaid") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [id, tripId, userId, startDate, endDate, totalPaid]
        );

        return result.rows[0];
    }

    async getById(id: string): Promise<TripReservation | null> {
        const result = await this.pool.query<TripReservation>(
            `SELECT * FROM ${TripReservationRepository.TABLE_NAME} WHERE "id" = $1`,
            [id]
        );

        return result.rows[0] || null;
    }

    async getByDateRange(id: string, startDate: Date, endDate: Date): Promise<TripReservation | null> {
        const result = await this.pool.query<TripReservation>(
            `SELECT * FROM ${TripReservationRepository.TABLE_NAME} WHERE "tripId" = $1 AND "startDate" <= $2 AND "endDate" >= $3`,
            [id, endDate, startDate]
        );

        return result.rows[0] || null;
    }

    async getAll(userId: string): Promise<TripReservation[]> {
        const result = await this.pool.query<TripReservation>(
            `SELECT * FROM ${TripReservationRepository.TABLE_NAME} WHERE "userId" = $1`,
            [userId]
        );

        return result.rows;
    }
}
