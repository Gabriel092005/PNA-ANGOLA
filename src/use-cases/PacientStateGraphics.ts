import { usersRepository } from "@/repositories/prisma/prisma-users-repository"


interface PacientStateGraphicsResponse{
    metrics:{
        normal:number
        bad:number
        good:number
    }
}

export class PacientStateGraphicsUseCase{
     constructor(private usersRepository:usersRepository){}

     async execute():Promise<PacientStateGraphicsResponse>{

           const pacientGOOD = await this.usersRepository.findUserGoodStateCount()
           const pacientBAD = await this.usersRepository.findUserBadStateCount()
           const pacientsNormal = await this.usersRepository.findUserNormalStateCount()
           const totalPacientes = await this.usersRepository.findTotalPacientCount()

           const percentage_normal  = Math.floor((pacientsNormal*100)/totalPacientes)
           const percentage_good  = Math.floor((pacientGOOD*100)/totalPacientes)
           const percentage_bad = Math.floor((pacientBAD*100)/totalPacientes)

           return{
               metrics:{
                 bad:percentage_bad,
                 good:percentage_good,
                 normal:percentage_normal
               }
           }



     }
}