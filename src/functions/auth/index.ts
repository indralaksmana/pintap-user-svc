import { handlerPath } from '@libs/handler-resolver';

export const login = {
    handler: `${handlerPath(__dirname)}/handler.login`,
    events: [
        {
            http: {
                method: 'post',
                path: 'auth/login',
            },
        },
    ],
};

export const verifyToken = {
    handler: `${handlerPath(__dirname)}/handler.verifyToken`
}