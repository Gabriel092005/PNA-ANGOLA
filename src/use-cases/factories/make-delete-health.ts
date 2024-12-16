import { PrismaHealthRepository } from "@/repositories/health_status_repositoy";
import { DeleteHealthUseCase } from "../delete-health-status";

export function  makeDeleteHealth(){
    const usersRepository = new PrismaHealthRepository()
    const usecase = new DeleteHealthUseCase(usersRepository)
    return usecase
}