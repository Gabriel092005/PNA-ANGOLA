import { PrismaUserRepository } from "@/repositories/users-repository";
import { RegisterUserUseCase } from "../register";


export function makeRegisterUseCase(){
    const usersRepository = new PrismaUserRepository()
    const RegisterUseCase = new  RegisterUserUseCase(usersRepository)
    return RegisterUseCase
}