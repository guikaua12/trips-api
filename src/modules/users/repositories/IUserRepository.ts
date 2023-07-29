import { QueryResult } from 'pg';
import { User } from '@/modules/users/models/User';
import { RegisterUserDTO } from '@/modules/users/dtos/RegisterUserDTO';
import { SearchUserDTO } from '@/modules/users/dtos/SearchUserDTO';

export interface IUserRepository {
    createTable(): Promise<QueryResult<any>>;
    search(data: SearchUserDTO): Promise<User | null>;
    deleteById(id: string): Promise<void | null>;
    create(data: RegisterUserDTO): Promise<User>;
}
