import { PrismaUserRepository } from "@/repositories/users-repository";
import { LogOutUseCase } from "../log-out";

export async function makeLogOut(){
    const usersRepository = new PrismaUserRepository()
    const usecase = new LogOutUseCase(usersRepository)
    return usecase
}