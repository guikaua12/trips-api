import { QueryResult } from 'pg';
import { User } from '@/modules/users/models/User';
import { CreateUserDTO } from '@/modules/users/dtos/CreateUserDTO';

export interface IUserRepository {
    createTable(): Promise<QueryResult<any>>;
    getById(id: string): Promise<User | null>;
    deleteById(id: string): Promise<void | null>;
    create(data: CreateUserDTO): Promise<User>;
}
