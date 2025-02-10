import { PrismaUserRepository } from "@/repositories/users-repository";
import { GetUserInativeUseCase } from "../userInative-metrics";




export function makeInativeAgenteMetrics(){
    const usersRepository = new PrismaUserRepository()
    const UseCase = new GetUserInativeUseCase(usersRepository)
    return  UseCase
}