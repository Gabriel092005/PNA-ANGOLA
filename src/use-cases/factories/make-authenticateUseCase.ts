import { PrismaUserRepository } from "@/repositories/users-repository";
import { AuthenticateUseCase } from "../authenticate";


export function makeAuthenticateUseCase(){
    const usersRepository = new PrismaUserRepository()
    const UseCase = new  AuthenticateUseCase(usersRepository)
    return  UseCase
}