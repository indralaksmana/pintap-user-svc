import prisma from '@middlewares/prisma.middleware';
import Crypt from '@utils/crypt/crypt.util';
import JWT from "@utils/jwt/jwt.util"

import IAuthRepository from "./auth.repository.intfc";


export default class AuthRepository implements IAuthRepository {
    async login(request: any): Promise<string> {
        try {
            const credential = await prisma.user.findFirst({
                where: {
                    name: request.name,
                },
            })

            if (!credential) {
                throw new Error("User is not exist.");
            }
            
            const valid = Crypt.comparePassword(credential.password, request.password)
            if (!valid) {
                throw new Error("Wrong credential.");
            }
            
            const token = await JWT.signToken(credential);
            return token
        } catch (e) {
            throw e
        }
    }
}