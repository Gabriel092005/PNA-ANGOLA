import { usersRepository } from "@/repositories/prisma/prisma-users-repository"


interface PacientMetricsUseCaseResponse{
    metrics:{

        totalPacienWithDiabet:number
        totalPacienWithHiper:number
        percentageWithDiabet:number
        totalPacient:number
        percentageWithHiper:number

    }
      
}

export class PacientMetricsUseCase{
    constructor(private usersRepository:usersRepository){}

   async execute():Promise<PacientMetricsUseCaseResponse>{

       const totalPacienWithDiabet = await this.usersRepository.findPacientWithDiabetCount()
       const totalPacienWithHiper= await this.usersRepository.findPacientWithHipertensaoCount()
       console.log(totalPacienWithHiper)
       const totalPacient = await this.usersRepository.findTotalUsers()

       const percentageWithDiabet=(totalPacienWithDiabet/totalPacient)*100
       const percentageWithHiper=(totalPacienWithHiper/totalPacient)*100

       return{

        metrics:{
            percentageWithDiabet:percentageWithDiabet,
            percentageWithHiper:percentageWithHiper,
            totalPacienWithDiabet:totalPacienWithDiabet,
            totalPacienWithHiper:totalPacienWithHiper,
            totalPacient:totalPacient
        }
       }


    }
}