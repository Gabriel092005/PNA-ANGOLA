import { QueryProps, usersRepository } from "@/repositories/prisma/prisma-users-repository";
import { User } from "@prisma/client";

interface FetchUsersUseCaseRequest{

    query:string|undefined
    role:string|undefined
    page:number
}
interface FetchUsersUseCaseResponse{
   Users:User[]
}

export class FetchUsersUseCase{
    constructor (private usersRepository:usersRepository){ }
    async execute({query,page,role}:FetchUsersUseCaseRequest):Promise<FetchUsersUseCaseResponse>{
        const Users = await this.usersRepository.Searchany(query,page)

        return{
            Users
        }
            
    }
}