import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { User } from "@prisma/client"

interface meta{
    totalcount: number
    perPage:number
    PageIndex:number
}

interface fetchUsersTechnicianRequest{
        province:string|undefined
        municipality :string|undefined
        unidade :string|undefined
        page?:string
}

interface fetchUsersTechnicianResponse{
    user:User[]
    meta:meta
    
}

export class fetchUsersTechnicianUseCase{
    constructor (private usersRepository:usersRepository){}

    async execute({municipality,province,unidade,page}:fetchUsersTechnicianRequest):Promise<fetchUsersTechnicianResponse>{
        
        const totalcount = await this.usersRepository.findTotalTechnitian()
        
        const user = await this.usersRepository.findAllTechnician(province,unidade,municipality,page)
        return{
            user,
            meta:{
                PageIndex:Number(page),
                perPage:5,
                totalcount:totalcount
            }
        }
      
    }
}