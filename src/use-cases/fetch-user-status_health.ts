import { HealthRepository } from "@/repositories/prisma/prisma-health_status-repository"
import { health_status } from "@prisma/client"

interface FetchUserHealthStatusRequest{
    userId:string
}
interface FetchUserHealthStatusResponse{
    healthStatus:health_status[]

}
export class FetchUserHealthStatusUseCase{
    constructor (private healthRepository:HealthRepository){}
    async execute({userId}:FetchUserHealthStatusRequest):Promise<FetchUserHealthStatusResponse>{
        const healthStatus = await this.healthRepository.fetchUserStatus(userId)
  
        return {
          
            healthStatus
        }
    }
}