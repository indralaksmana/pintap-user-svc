import { User } from '@configs/entities/user.entity';

export default interface IUserUseCase {
    getAllUsers(): Promise<User[]>
    createUser(request: any): Promise<User>
    getUser(userId: string): Promise<any>
    updateUser(userId: string, user: any): Promise<User>
    deleteUser(userId: string): Promise<any>
}