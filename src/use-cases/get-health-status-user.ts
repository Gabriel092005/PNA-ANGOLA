import { HealthRepository } from "@/repositories/prisma/prisma-health_status-repository"
import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { health_status } from "@prisma/client"
import { resourceNotFoundError } from "./erros/resource-not-found-errors"

interface GetHealthStatusRequest{
    userId:string
}

interface GetHealthStatusResponse{
     health_status:health_status[]
}
export class GetHealthStatusUseCase  {
       constructor(
        private healthStatusRepository:HealthRepository,
        private usersRepository:usersRepository

       ){}
          async execute({userId}:GetHealthStatusRequest):Promise<GetHealthStatusResponse>{
            const user = this.usersRepository.findById(userId)
             if(!user){
                  throw new resourceNotFoundError()
             }
            const health_status = await this.healthStatusRepository.GetHealthStatusOne(userId)
               return  {
                health_status
               }
          }
}