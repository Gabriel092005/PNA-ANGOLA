import { HealthRepository } from "@/repositories/prisma/prisma-health_status-repository"
import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { health_status } from "@prisma/client"
import { resourceNotFoundError } from "./erros/resource-not-found-errors"

interface GetUserHealthStatusRequest{
    userId:string
}
interface GetUserHealthStatusResponse{
    health_status:health_status[]
}
export class GetUserHealthStatusUseCase{
    constructor (
        private healthRepository:HealthRepository,
        // private usersRepository:usersRepository
    ){}
    async execute({userId}:GetUserHealthStatusRequest):Promise<GetUserHealthStatusResponse>{
        // const  user = await this.usersRepository.findById(userId)
        // if(!user){
        //     throw new resourceNotFoundError()
        // }
        const health_status = await this.healthRepository.findUserHealthStatus(userId)
        console.log(health_status)
        
        return{
            health_status
        }
    }
}