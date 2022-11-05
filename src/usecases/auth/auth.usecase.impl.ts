
import IAuthUseCase from "./auth.usecase.intfc";
import IAuthRepository from '@repositories/auth/auth.repository.intfc';
import AuthRepository from '@repositories/auth/auth.repository.impl';

import { formatJSONResponse } from '@libs/api-gateway';
import { Response } from '@configs/reponse/response'
import { HttpStatus } from "@configs/constants/http.constant";

export default class AuthUseCase implements IAuthUseCase {

    private authRepository: IAuthRepository

    constructor() {
        this.authRepository = new AuthRepository()
    }

    async login(request: any): Promise<Response> {
        try {
            const token = await this.authRepository.login(request)
            return formatJSONResponse({
                token
            })
        } catch (e) {
            if (e.message === "Wrong credential.") {
                return formatJSONResponse({
                    status: HttpStatus.NotFound,
                    message: e.message
                })
            }
            throw e
        }
    }
}