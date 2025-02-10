import { PrismaUserRepository } from "@/repositories/users-repository";
import { KillPacientUseCase } from "../kill-pacient";


export function makeKillPacient (){
    const usersRepository = new PrismaUserRepository()
    const usecase = new KillPacientUseCase(usersRepository)
    return usecase
}