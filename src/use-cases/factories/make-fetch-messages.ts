import { PrismaMessagesRepository } from "@/repositories/message-repository";
import { PrismaUserRepository } from "@/repositories/users-repository";
import { FetchMessagesUseCase } from "../fetch-messages";

export function makeFetchMessages(){
    // const usersRepository =  new PrismaUserRepository()
    const messagesRepository = new PrismaMessagesRepository()
    const usersRepository = new PrismaUserRepository()

    const usecase = new FetchMessagesUseCase(messagesRepository,usersRepository)
    return usecase
}