export default interface IAuthRepository {
    login(request: any): Promise<string>
}