import { PrismaUserRepository } from "@/repositories/users-repository";
import { DeleteUserUseCase } from "../delete-user";



export function makeDeleteUser(){
    const usersRepository = new PrismaUserRepository()
    const UseCase = new DeleteUserUseCase(usersRepository)
    return  UseCase
}