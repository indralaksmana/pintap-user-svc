import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import UserService from '@services/index'

export const getAllUsers = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const users = await UserService.getAllUsers();
    return formatJSONResponse({
        users
    })
})

export const createUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const user = await UserService.createUser(event.body)
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
    const id = event.pathParameters.id;
    try {
        const user = await UserService.getUser(parseInt(id))
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
    const id = event.pathParameters.id;
    try {
        const user = await UserService.updateUser(parseInt(id), event.body)
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
    const id = event.pathParameters.id;
    try {
        const user = await UserService.deleteUser(parseInt(id))
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