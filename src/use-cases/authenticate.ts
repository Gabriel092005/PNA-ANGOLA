import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { User } from "@prisma/client"
import { invalidCredentialsError } from "./erros/invalid-credentials-error"


interface AuthenticateUseCaseRequest{
    name:string
    nip:string
}

interface AuthenticateUseCaseResponse{
    User:User
}

export class AuthenticateUseCase{
    constructor(private usersRepository:usersRepository){}
    async execute({ name,nip}:AuthenticateUseCaseRequest):Promise<AuthenticateUseCaseResponse>
    {
      const User = await this.usersRepository.findByNip(nip)
 
    
      if(!User || User?.name !== name){
        throw new invalidCredentialsError()
      }

      return{
        User
      }
    }
}