import { PrismaUserRepository } from "@/repositories/users-repository";
import { FetchUsersUseCase } from "../fetch-users";



export function makeFetchUseCase(){
    const usersRepository = new PrismaUserRepository()
    const UseCase = new  FetchUsersUseCase(usersRepository)
    return  UseCase
}