import { PrismaUserRepository } from "@/repositories/users-repository";
import { KilledAgentUseCase } from "../killed-agent";

export async function makeKilledAgent(){
    const usersRepository = new PrismaUserRepository()
    const usecase = new KilledAgentUseCase(usersRepository)
    return usecase
}