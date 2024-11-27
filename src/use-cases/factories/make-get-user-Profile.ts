import { PrismaUserRepository } from "@/repositories/users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";



export function makeGetUserProfileCase(){
    const usersRepository = new PrismaUserRepository()
    const UseCase = new GetUserProfileUseCase(usersRepository)
    return  UseCase
}