import { PrismaUserRepository } from "@/repositories/users-repository";
import { FetchUsersByProvinceUseCase } from "../fectchUsersFilters";

export function makeFetchUsersByProvince(){
    const usersRepository = new PrismaUserRepository()
    const usecase = new FetchUsersByProvinceUseCase(usersRepository)
    return usecase
}