import { MessagesRepository } from "@/repositories/prisma/prisma-messages.repository"
import { messages } from "@prisma/client"

interface FetchMessagesRequest{
    query:string|undefined
}

interface FetchMessagesUserResponse{
    messages:messages[]
}
export class FetchMessagesUseCase{
    constructor (
        private messagesRepository:MessagesRepository,
    
    ){}

async execute({query}:FetchMessagesRequest):Promise<FetchMessagesUserResponse>
    {
      
        const messages = await this.messagesRepository.FindAllMessage(query)
        return {
            messages
        }
    }
}