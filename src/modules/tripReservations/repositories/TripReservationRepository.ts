import { ITripReservationRepository } from '@/modules/tripReservations/repositories/ITripReservationRepository';
import { ReserveTripDTO } from '@/modules/tripReservations/reserveTrip/ReserveTripDTO';
import { TripReservation } from '@/modules/tripReservations/models/TripReservation';
import { Pool, QueryResult } from 'pg';
import { v4 } from 'uuid';
import { UpdateTripReservationDTO } from '@/modules/tripReservations/updateTripReservation/UpdateTripReservationDTO';
import { GetAllTripReservationDTO } from '@/modules/tripReservations/getAllTripReservation/GetAllTripReservationDTO';

export class TripReservationRepository implements ITripReservationRepository {
    public static TABLE_NAME = 'trips_reservations';
    constructor(private pool: Pool) {}

    async createTable(): Promise<QueryResult<any>> {
        return this.pool.query(
            `CREATE TABLE IF NOT EXISTS ${TripReservationRepository.TABLE_NAME} (
                "id" VARCHAR PRIMARY KEY, 
                "tripId" VARCHAR, 
                "userId" VARCHAR, 
                "startDate" DATE, 
                "endDate" DATE, 
                "totalPaid" DECIMAL(8,2),
                "status" VARCHAR,
                "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`
        );
    }

    async create({ tripId, userId, startDate, endDate, totalPaid }: ReserveTripDTO): Promise<TripReservation> {
        const id = v4();
        const defaultStatus = 'confirmed';

        const result = await this.pool.query<TripReservation>(
            `INSERT INTO ${TripReservationRepository.TABLE_NAME} ("id", "tripId", "userId", "startDate", "endDate", "totalPaid", "status") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [id, tripId, userId, startDate, endDate, totalPaid, defaultStatus]
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
            `SELECT * FROM ${TripReservationRepository.TABLE_NAME} WHERE "tripId" = $1 AND "startDate" <= $2 AND "endDate" >= $3 AND "status" != 'cancelled'`,
            [id, endDate, startDate]
        );

        return result.rows[0] || null;
    }

    async update({ id, userId, status }: UpdateTripReservationDTO): Promise<TripReservation | null> {
        const query: string[] = [];

        if (status && status.length) {
            query.push(`"status" = '${status}'`);
        }

        if (!query.length) return null;

        const result = await this.pool.query<TripReservation>(
            `UPDATE ${TripReservationRepository.TABLE_NAME} SET ${query.join(
                ', '
            )} WHERE "id" = $1 AND "userId" = $2 RETURNING *`,
            [id, userId]
        );

        return result.rows[0];
    }

    async getAll({ id, page }: GetAllTripReservationDTO): Promise<TripReservation[]> {
        const limitPerPage = 5;
        const offset = (page - 1) * limitPerPage;

        const result = await this.pool.query<TripReservation>(
            `SELECT * FROM ${TripReservationRepository.TABLE_NAME} WHERE "userId" = $1 LIMIT $2 OFFSET $3`,
            [id, limitPerPage, offset]
        );

        return result.rows;
    }

    async getAllById(userId: string): Promise<TripReservation[]> {
        const result = await this.pool.query<TripReservation>(
            `SELECT * FROM ${TripReservationRepository.TABLE_NAME} WHERE "userId" = $1`,
            [userId]
        );

        return result.rows;
    }
}
