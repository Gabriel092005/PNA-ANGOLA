import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { User } from "@prisma/client"
import { invalidCredentialsError } from "./erros/invalid-credentials-error"


interface AuthenticateUseCaseRequest{
    name:string
    nip:string
}

interface AuthenticateUseCaseResponse{
    user:User
}

export class AuthenticateUseCase{
    constructor(private usersRepository:usersRepository){}
    async execute({ name,nip}:AuthenticateUseCaseRequest):Promise<AuthenticateUseCaseResponse>
    {
      const user = await this.usersRepository.findByNip(nip)
 
    
      if(!user){
        throw new invalidCredentialsError()
      }

      return{
        user
      }
    }
}