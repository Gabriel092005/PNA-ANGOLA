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
    totalCount:number
}

export class FetchUsersByProvinceUseCase{
    
    constructor (private usersRepository:usersRepository){}
    async execute({municipality,nip,province,unidade,page,}:FetchUsersByProvinceRequest):Promise<FetchUsersByProvinceResponse>{
      
            const user  = await this.usersRepository.findUsersFilters(province,municipality,unidade,nip,page)
            const totalCount = await this.usersRepository.findTotalPacientCount()
             console.log(totalCount)
            return{

               totalCount,
                user
            }
    }
    
}