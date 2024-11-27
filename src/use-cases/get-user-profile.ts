import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { invalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error"
import { User } from "@prisma/client"


interface GetUserProfileUseCaseRequest{
    userId : string
}

interface  GetUserProfileUseCaseResponse {
   user: User
}


export class GetUserProfileUseCase{

    constructor(private usersRepository:usersRepository){}

    async execute
    ({userId} : GetUserProfileUseCaseRequest) : Promise<GetUserProfileUseCaseResponse>{
 
        const user = await this.usersRepository.findById(userId)

        if(!user){
           throw new  invalidCredentialsError()
        }


        return {
            user,
        }


      
    }


    
}