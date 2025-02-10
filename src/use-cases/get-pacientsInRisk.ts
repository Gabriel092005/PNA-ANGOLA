import { usersRepository } from "@/repositories/prisma/prisma-users-repository";


interface PacientsInRiskResponse{
    PacientsInRiskAmount :number
}

export class PacientsInRiskUsecase {
     constructor(private usersRepository:usersRepository){}

     async execute():Promise<PacientsInRiskResponse>{

          const PacientsInRiskAmount = await this.usersRepository.findUserBadStateCount()
          
          
          return{
            PacientsInRiskAmount
          }
          
     }

}