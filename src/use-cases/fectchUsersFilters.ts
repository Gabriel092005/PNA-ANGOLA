import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { User } from "@prisma/client"

interface FetchUsersByProvinceRequest{
    province:string|undefined
    municipality:string|undefined
    unidade:string|undefined
    nip:string|undefined
    page:string|undefined
}

interface FetchUsersByProvinceResponse{
    user:User[]
}

export class FetchUsersByProvinceUseCase{
    
    constructor (private usersRepository:usersRepository){}
    async execute({municipality,nip,province,unidade,page}:FetchUsersByProvinceRequest):Promise<FetchUsersByProvinceResponse>{
      
            const user  = await this.usersRepository.findUsersFilters(province,municipality,unidade,nip)
         
          
            return{
                user
            }
    }
    
}