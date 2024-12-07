import { PrismaUserRepository } from "@/repositories/users-repository";
import { totalCountUseCase } from "../totalUserCount";


export function makeTotalCountPacient(){
    const usersRepository = new PrismaUserRepository()
    const usecase = new totalCountUseCase(usersRepository)
    return usecase
}