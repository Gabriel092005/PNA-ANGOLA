import { PrismaUserRepository } from "@/repositories/users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";
import { PacientMetricsUseCase } from "../pacient-metrics";



export function makePacientMetrics(){
    const usersRepository = new PrismaUserRepository()
    const UseCase = new PacientMetricsUseCase (usersRepository)
    return  UseCase
}