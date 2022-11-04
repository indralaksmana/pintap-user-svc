import { User } from '@prisma/client';
import prisma from '../../prisma/middleware';
import Crypt from 'src/utils/crypt/crypt.util';

export default class UserService {

    async getAllUsers(): Promise<User[]> {
        try {
            const allUsers = await prisma.user.findMany({
                where: {
                    deletedAt: null
                }
            })
            return allUsers as User[];
        } catch (e) {
            throw e
        }
    }

    async createUser(request: any): Promise<User> {
        try {
            const user = await prisma.user.create({
                data: {
                    name: request.name,
                    password: Crypt.encryptPassword(request.password),
                    createdAt: new Date()
                }
            })
            return user as User;
        } catch (e) {
            throw e
        }
    }

    async getUser(userId: number): Promise<any> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            })
            if (!user) {
                throw new Error("Id does not exit");
            }
            return user as User;
        } catch (e) {
            throw e
        }
    }

    async updateUser(userId: number, user: any): Promise<User> {
        try {
            user.updatedAt = new Date();
            user.password = Crypt.encryptPassword(user.password)
            const updatedUser = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: user,
            })
            return updatedUser as User;
        } catch (e) {
            throw e
        }
    }

    async deleteUser(userId: number): Promise<any> {
        try {
            const deleteUser = await prisma.user.delete({
                where: {
                    id: userId,
                },
            })
            return deleteUser
        } catch (e) {
            throw e
        }
    }
}