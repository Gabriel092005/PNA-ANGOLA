import { PrismaMessagesRepository } from "@/repositories/message-repository";
import { GetMessagesAmountUseCase } from "../get-messages-amount";

export async function makeGetMessagesAmount(){
    const messagesRepository = new PrismaMessagesRepository()
    const usecase = new GetMessagesAmountUseCase(messagesRepository)
    return usecase
}