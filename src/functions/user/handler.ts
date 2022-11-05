import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import UserUseCase from "@usecases/user/user.usecase.impl";
import IUserUseCase from "@usecases/user/user.usecase.intfc";

export const getAllUsers = middyfy(async (): Promise<APIGatewayProxyResult> => {
    try {
        const userUseCase: IUserUseCase = new UserUseCase()
        const users = await userUseCase.getAllUsers()
        return formatJSONResponse({
            users
        })
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e.message
        });
    }
})

export const createUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const userUseCase: IUserUseCase = new UserUseCase()
        const user = await userUseCase.createUser(event.body)
        return formatJSONResponse({
            user
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e.message
        });
    }
})

export const getUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters.id;
        const userUseCase: IUserUseCase = new UserUseCase()
        const user = await userUseCase.getUser(id)
        return formatJSONResponse({
            user
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e.message
        });
    }
})

export const updateUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters.id;
        const userUseCase: IUserUseCase = new UserUseCase()
        const user = await userUseCase.updateUser(id, event.body)
        return formatJSONResponse({
            user
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e.message
        });
    }
})

export const deleteUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters.id;
        const userUseCase: IUserUseCase = new UserUseCase()
        const user = await userUseCase.deleteUser(id)
        return formatJSONResponse({
            user
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e.message
        });
    }
})