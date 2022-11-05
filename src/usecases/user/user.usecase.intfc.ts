import { Response } from '@configs/reponse/response'

export default interface IUserUseCase {
    getAllUsers(): Promise<Response>
    createUser(request: any): Promise<Response>
    getUser(userId: string): Promise<Response>
    updateUser(userId: string, user: any): Promise<Response>
    deleteUser(userId: string): Promise<Response>
}