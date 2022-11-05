import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import UserUseCase from "@usecases/user/user.usecase.impl";
import IUserUseCase from "@usecases/user/user.usecase.intfc";
import { HttpStatus } from "@configs/constants/http.constant";

export const getAllUsers = middyfy(async (): Promise<APIGatewayProxyResult> => {
    try {
        const userUseCase: IUserUseCase = new UserUseCase()
        const response = await userUseCase.getAllUsers()
        return response
    } catch (e) {
        return formatJSONResponse({
            status: HttpStatus.InternalServerError,
            message: e.message
        });
    }
})

export const createUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const userUseCase: IUserUseCase = new UserUseCase()
        const response = await userUseCase.createUser(event.body)
        return response
    } catch (e) {
        return formatJSONResponse({
            status: HttpStatus.InternalServerError,
            message: e.message
        });
    }
})

export const getUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters.id;
        const userUseCase: IUserUseCase = new UserUseCase()
        const response = await userUseCase.getUser(id)
        return response
    } catch (e) {
        return formatJSONResponse({
            status: HttpStatus.InternalServerError,
            message: e.message
        });
    }
})

export const updateUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters.id;
        const userUseCase: IUserUseCase = new UserUseCase()
        const response = await userUseCase.updateUser(id, event.body)
        return response
    } catch (e) {
        return formatJSONResponse({
            status: HttpStatus.InternalServerError,
            message: e.message
        });
    }
})

export const deleteUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters.id;
        const userUseCase: IUserUseCase = new UserUseCase()
        const response = await userUseCase.deleteUser(id)
        return response
    } catch (e) {
        return formatJSONResponse({
            status: HttpStatus.InternalServerError,
            message: e.message
        });
    }
})