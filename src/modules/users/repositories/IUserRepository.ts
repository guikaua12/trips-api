import { User } from '@/modules/users/models/User';
import { RegisterUserDTO } from '@/modules/users/registerUser/dto';
import { SearchUserDTO } from '@/modules/users/searchUser/dto';

export interface IUserRepository {
    createTable(): Promise<void>;

    insert(data: RegisterUserDTO): Promise<User>;

    search(data: SearchUserDTO): Promise<User | null>;

    deleteById(id: string): Promise<void | null>;

    deleteAll(): Promise<void | null>;
}
