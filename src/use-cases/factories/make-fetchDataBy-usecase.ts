import { PrismaUserRepository } from "@/repositories/users-repository";
import { FetchDataByuseCase } from "../fetchdataBy";


export function makeFetchDataBy (){
    const usersRepository = new PrismaUserRepository()
    const usecase = new FetchDataByuseCase(usersRepository)
    return usecase
}