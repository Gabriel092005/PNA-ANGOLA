import { PrismaHealthRepository } from "@/repositories/health_status_repositoy";
import { FetchUserHealthStatusUseCase } from "../fetch-user-status_health";


export async function makeFetchUserHealthStatus(){
    const healthRepository = new PrismaHealthRepository()
    const usecase  = new FetchUserHealthStatusUseCase(healthRepository)
    return usecase
}