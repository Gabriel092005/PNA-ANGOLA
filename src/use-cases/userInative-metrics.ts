import { usersRepository } from "@/repositories/prisma/prisma-users-repository";

interface GetUserInativeResponse{
    IsAliveAgent:{
        Woman:number,
        Man:number,
        Alive:number,
        NotAlive:number,
    }
}

export class GetUserInativeUseCase {
    constructor (private usersRepository:usersRepository){}

   async execute():Promise<GetUserInativeResponse>{

          const IsAliveAgent =await this.usersRepository.findUserAlive()
            
          return{
            IsAliveAgent
          }
    }
}