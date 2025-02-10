import { PrismaMessagesRepository } from "@/repositories/message-repository";
import { DeleteMessagesUseCase } from "../delete-messages";


export async function makeDeleMessage(){
    const MessagesRepository = new PrismaMessagesRepository()
    const usecase  = new DeleteMessagesUseCase(MessagesRepository)
    return usecase
}