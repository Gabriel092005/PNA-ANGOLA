import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { User } from "@prisma/client"
import { resourceNotFoundError } from "./erros/resource-not-found-errors"

interface LogOutUseCaseRequest{
    userId:string
}
interface LogOutUseCaseResponse{
    user:User
}

export class LogOutUseCase {
    constructor (private usersRepository:usersRepository){}
    async execute({userId}:LogOutUseCaseRequest):Promise<LogOutUseCaseResponse>{
        const User = await this.usersRepository.findById(userId)
        if(!User){
            throw new resourceNotFoundError()
        }
       const user = await this.usersRepository.iSactiveUser(userId)
       return{
        user
       }

    }
    
}