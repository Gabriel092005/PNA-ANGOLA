import { PrismaUserRepository } from "@/repositories/users-repository";
import { RegisterUserUseCase } from "../register";
import { PacientStateGraphicsUseCase } from "../PacientStateGraphics";


export function makePacientStateUseCase(){
    const usersRepository = new PrismaUserRepository()
    const UseCase = new  PacientStateGraphicsUseCase(usersRepository)
    return UseCase
}