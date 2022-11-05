import { Prisma } from '@configs/database/prisma'

import IUserUseCase from "./user.usecase.intfc";
import IUserRepository from '@repositories/user/user.repository.intfc';
import UserRepository from '@repositories/user/user.repository.impl';

import { formatJSONResponse } from '@libs/api-gateway';
import { Response } from '@configs/reponse/response'
import { HttpStatus } from "@configs/constants/http.constant";

export default class UserUseCase implements IUserUseCase {

    private userRepository: IUserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    async getAllUsers(): Promise<Response> {
        try {
            const data = await this.userRepository.getAllUsers()
            return formatJSONResponse({
                data
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2018') {
                    return formatJSONResponse({
                        status: HttpStatus.NotFound,
                        message: e.message
                    });
                }
            }
            throw e
        }
    }

    async createUser(request: any): Promise<Response> {
        try {
            const data = await this.userRepository.createUser(request)
            return formatJSONResponse({
                data
            })
        } catch (e) {
            throw e
        }
    }

    async getUser(userId: string): Promise<any> {
        try {
            const data = await this.userRepository.getUser(userId)
            return formatJSONResponse({
                data
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2018') {
                    return formatJSONResponse({
                        status: HttpStatus.NotFound,
                        message: e.message
                    });
                }
            }
            throw e
        }
    }

    async updateUser(userId: string, user: any): Promise<Response> {
        try {
            const data = await this.userRepository.updateUser(userId, user)
            return formatJSONResponse({
                data
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2018') {
                    return formatJSONResponse({
                        status: HttpStatus.NotFound,
                        message: e.message
                    });
                }
            }
            throw e
        }
    }

    async deleteUser(userId: string): Promise<Response> {
        try {
            const data = await this.userRepository.deleteUser(userId)
            return formatJSONResponse({
                data
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2018') {
                    return formatJSONResponse({
                        status: HttpStatus.NotFound,
                        message: e.message
                    });
                }
            }
            throw e
        }
    }
}