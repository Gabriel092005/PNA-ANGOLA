import { usersRepository } from "@/repositories/prisma/prisma-users-repository";
import { User } from "@prisma/client";

interface FetchUsersUseCaseRequest{

    query:string
    // page:number
}
interface FetchUsersUseCaseResponse{
   Users:User[]
}

export class FetchUsersUseCase{
    constructor (private usersRepository:usersRepository){ }
    async execute({query}:FetchUsersUseCaseRequest):Promise<FetchUsersUseCaseResponse>{
        const Users = await this.usersRepository.Searchany(query)
        return{
            Users
        }
            
    }
}