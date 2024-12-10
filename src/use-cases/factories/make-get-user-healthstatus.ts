import { PrismaHealthRepository } from "@/repositories/health_status_repositoy";
import { PrismaUserRepository } from "@/repositories/users-repository";
import { GetUserHealthStatusUseCase } from "../get-user-healthstatus";


export  function makeGetUserHealthStatus(){

    const healthRepository = new PrismaHealthRepository()
    const usecase = new GetUserHealthStatusUseCase(healthRepository)
    return usecase
}