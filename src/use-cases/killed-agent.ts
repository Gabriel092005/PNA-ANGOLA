import { usersRepository } from "@/repositories/prisma/prisma-users-repository";
import { User } from "@prisma/client";


interface FetchKilledAgentResponse{
    users:User[]
    meta:{
        perPage:number
        pageIndex:number
        totalCount:number
    }
}

interface FetchKilledAgentRequest{
    query:string|undefined
    page:string|undefined
}

export class KilledAgentUseCase{
    constructor(private usersRepository:usersRepository){}
     async execute({page,query}:FetchKilledAgentRequest):Promise<FetchKilledAgentResponse>{
          
          const users = await this.usersRepository.inactiveAgents(page,query)
          const totalCount = await this.usersRepository.totalAgentInactiveCount()
          return {
            users,meta:{
                pageIndex:Number(page),
                perPage:9,
                totalCount:totalCount
            }
          }
     }
}