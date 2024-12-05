import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { User } from "@prisma/client"

interface FetchUsersByProvinceRequest{
    query:string
}

interface FetchUsersByProvinceResponse{
    user:User[]
}

export class FetchUsersByProvinceUseCase{

    constructor (private usersRepository:usersRepository){}
    async execute({query}:FetchUsersByProvinceRequest):Promise<FetchUsersByProvinceResponse>{
            const user  = await this.usersRepository.findUsersByProvince(query)
            return{
                user
            }
    }
    
}