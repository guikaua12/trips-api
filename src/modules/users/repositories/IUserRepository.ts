import { QueryResult } from 'pg';
import { User } from '@/modules/users/models/User';
import { CreateUserDTO } from '@/modules/users/dtos/CreateUserDTO';
import { SearchUserDTO } from '@/modules/users/dtos/SearchUserDTO';

export interface IUserRepository {
    createTable(): Promise<QueryResult<any>>;
    search(data: SearchUserDTO): Promise<User | null>;
    deleteById(id: string): Promise<void | null>;
    create(data: CreateUserDTO): Promise<User>;
}
