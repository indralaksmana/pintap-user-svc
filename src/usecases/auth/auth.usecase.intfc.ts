import { Response } from '@configs/reponse/response'

export default interface IAuthUseCase {
    login(request: any): Promise<Response>
}