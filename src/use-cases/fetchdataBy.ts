import { usersRepository } from "@/repositories/prisma/prisma-users-repository"

interface Metrics {
    diabetico:number
    hipertenso:number
    totalPacientes:number
    pacientsRisco:number
}

interface FetchDataByRequest{
    province:string|undefined
    municipality:string|undefined
    gender:string|undefined
    date:string|undefined
}
interface FetchDataByResponse{
    Metrics :Metrics
}
export class FetchDataByuseCase {
    constructor(private usersRepository:usersRepository){}

    async execute({date,gender,municipality,province}:FetchDataByRequest):Promise<FetchDataByResponse>{
       console.log(gender)
        const Metrics = await this.usersRepository.filterDataBy(province,municipality,gender)
               
          return {
            Metrics
          }
        }

}