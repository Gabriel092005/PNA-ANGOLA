import { MessagesRepository } from "@/repositories/prisma/prisma-messages.repository"
import { messages } from "@prisma/client"

interface OpenMessagesUseCaseRequest{
    userId:string
    messageId:string
}

interface OpenMessagesUseCaseResponse{
    message:messages
}

export class OpenMessagesUseCase{
    constructor(private messagesRepository:MessagesRepository){}
   async execute({messageId,userId}:OpenMessagesUseCaseRequest):Promise<OpenMessagesUseCaseResponse>
    {
        const message =await this.messagesRepository.OpenMessages(messageId,userId)
        return {
            message
        }
    }
}