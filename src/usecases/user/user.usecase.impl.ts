import IUserUseCase from "./user.usecase.intfc";
import IUserRepository from '@repositories/user/user.repository.intfc';
import UserRepository from '@repositories/user/user.repository.impl';
import { User } from '@configs/entities/user.entity';

export default class UserUseCase implements IUserUseCase {

    private userRepository: IUserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const allUsers = await this.userRepository.getAllUsers()
            return allUsers
        } catch (e) {
            throw e
        }
    }

    async createUser(request: any): Promise<User> {
        try {
            const createdUser = await this.userRepository.createUser(request)
            return createdUser
        } catch (e) {
            throw e
        }
    }

    async getUser(userId: string): Promise<any> {
        try {
            const user = await this.userRepository.getUser(userId)
            return user
        } catch (e) {
            throw e
        }
    }

    async updateUser(userId: string, user: any): Promise<User> {
        try {
            const updatedUser = await this.userRepository.updateUser(userId, user)
            return updatedUser
        } catch (e) {
            throw e
        }
    }

    async deleteUser(userId: string): Promise<any> {
        try {
            const deletedUser = await this.userRepository.deleteUser(userId)
            return deletedUser
        } catch (e) {
            throw e
        }
    }
}