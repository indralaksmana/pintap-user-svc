import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import AuthUseCase from "@usecases/auth/auth.usecase.impl";
import IAuthUseCase from "@usecases/auth/auth.usecase.intfc";
import { HttpStatus } from "@configs/constants/http.constant";
import JWT from "@utils/jwt/jwt.util"

export const login = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const authUseCase: IAuthUseCase = new AuthUseCase()
        const response = await authUseCase.login(event.body)
        return response
    } catch (e) {
        return formatJSONResponse({
            status: HttpStatus.InternalServerError,
            message: e.message
        });
    }
})

export const verifyToken = async (event, context, callback): Promise<void> => {
    try {
        const token = event.authorizationToken.replace("Bearer ", "");
        const methodArn = event.methodArn;
        if (!token || !methodArn) return callback(null, "Unauthorized");
        
        const decoded = await JWT.validateToken(token)
        if (decoded && decoded.id) {
            return callback(null, generateAuthResponse(decoded.id, "Allow", methodArn));
        } else {
            return callback(null, generateAuthResponse(decoded.id, "Deny", methodArn));
        }
    } catch (e) {
        throw e
    }
}

const generateAuthResponse = (principalId, effect, methodArn) => {
    const policyDocument = generatePolicyDocument(effect, methodArn);

    return {
        principalId,
        policyDocument
    };
}

const generatePolicyDocument = (effect, methodArn) => {
    if (!effect || !methodArn) return null;

    const policyDocument = {
        Version: "2012-10-17",
        Statement: [
            {
                Action: "execute-api:Invoke",
                Effect: effect,
                Resource: methodArn
            }
        ]
    };

    return policyDocument;
}