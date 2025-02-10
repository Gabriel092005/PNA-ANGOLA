import { PrismaUserRepository } from "@/repositories/users-repository";
import { PacientsInRiskUsecase } from "../get-pacientsInRisk";



export function makeFindPacientBaseState(){
    const usersRepository = new PrismaUserRepository()
    const usecase  = new PacientsInRiskUsecase(usersRepository)
    return usecase
}