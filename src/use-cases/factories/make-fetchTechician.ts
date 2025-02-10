import { PrismaUserRepository } from "@/repositories/users-repository";
import { fetchUsersTechnicianUseCase } from "../fetch-all-technician";



export function makeFetchTechnician(){

    const usersRepository = new PrismaUserRepository()
    const UseCase = new fetchUsersTechnicianUseCase(usersRepository)
    
    return  UseCase
}