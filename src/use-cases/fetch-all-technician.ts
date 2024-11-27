import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { User } from "@prisma/client"

interface fetchUsersTechnicianRequest{
    role:string
}

interface fetchUsersTechnicianResponse{
    user:User[]
}

export class fetchUsersTechnicianUseCase{
    constructor (private usersRepository:usersRepository){}

    async execute({role}:fetchUsersTechnicianRequest):Promise<fetchUsersTechnicianResponse>{
        const user = await this.usersRepository.findAllTechnician(role)
        return{
            user
        }
      
    }
}