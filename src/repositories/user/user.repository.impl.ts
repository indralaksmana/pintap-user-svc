import { User } from '@configs/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';


import prisma from '@middlewares/prisma.middleware';
import Crypt from '@utils/crypt/crypt.util';

import IUserRepository from "./user.repository.intfc";

export default class UserRepository implements IUserRepository {
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
                    id: uuidv4(),
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

    async getUser(userId: string): Promise<any> {
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

    async updateUser(userId: string, user: any): Promise<User> {
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

    async deleteUser(userId: string): Promise<any> {
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