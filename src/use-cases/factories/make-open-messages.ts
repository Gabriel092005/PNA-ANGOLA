import { PrismaMessagesRepository } from "@/repositories/message-repository";
import { OpenMessagesUseCase } from "../open-messages";

export function makeOpenMessages(){
    const messagesRepository = new PrismaMessagesRepository()
    const usecase = new OpenMessagesUseCase(messagesRepository)
    return usecase
}