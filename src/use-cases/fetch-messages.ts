import { MessagesRepository } from "@/repositories/prisma/prisma-messages.repository"
import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { messages } from "@prisma/client"

interface FetchMessagesUserRequest{
    userId:string
}

interface FetchMessagesUserResponse{
    messages:messages[]
}

export class FetchMessagesUseCase{
    constructor (
        private messagesRepository:MessagesRepository,
    ){}

    async execute({userId}:FetchMessagesUserRequest):Promise<FetchMessagesUserResponse>
    {
        
        const messages = await this.messagesRepository.FindAllMessage(userId)
        return {
            messages
        }
    }
}