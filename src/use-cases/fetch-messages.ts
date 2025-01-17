import { MessagesRepository } from "@/repositories/prisma/prisma-messages.repository"
import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { messages } from "@prisma/client"
import { resourceNotFoundError } from "./erros/resource-not-found-errors"


interface FetchMessagesUserResponse{
    messages:messages[]
}
export class FetchMessagesUseCase{
    constructor (
        private messagesRepository:MessagesRepository,
    
    ){}

async execute():Promise<FetchMessagesUserResponse>
    {
      
        const messages = await this.messagesRepository.FindAllMessage()
        return {
            messages
        }
    }
}