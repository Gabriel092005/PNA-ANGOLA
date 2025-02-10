import { usersRepository } from "@/repositories/prisma/prisma-users-repository";

 interface KillPacientRequest{
    userId:string
}

export class KillPacientUseCase{

     constructor(private usersRepository:usersRepository){}
       

     async execute({userId}:KillPacientRequest){
           console.log('use-case',userId)

        await this.usersRepository.killPacient(userId)
        
     }
}