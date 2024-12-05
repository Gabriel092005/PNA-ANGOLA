import { PrismaUserRepository } from "@/repositories/users-repository";
import { FetchUsersByProvinceUseCase } from "../fetchbyProvince";

export function makeFetchUsersByProvince(){
    const usersRepository = new PrismaUserRepository()
    const usecase = new FetchUsersByProvinceUseCase(usersRepository)
    return usecase
}