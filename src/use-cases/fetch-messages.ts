import { MessagesRepository } from "@/repositories/prisma/prisma-messages.repository"
import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { messages } from "@prisma/client"
import { resourceNotFoundError } from "./erros/resource-not-found-errors"

interface FetchMessagesUserRequest{
    userId:string
}

interface FetchMessagesUserResponse{
    messages:messages[]
}

export class FetchMessagesUseCase{
    constructor (
        private messagesRepository:MessagesRepository,
        private usersRepositry:usersRepository
    ){}

    async execute({userId}:FetchMessagesUserRequest):Promise<FetchMessagesUserResponse>
    {
      
        const user = await this.usersRepositry.findById(userId)
        if(!user){
            throw new resourceNotFoundError()
        }
        
        const messages = await this.messagesRepository.FindAllMessage(userId)
     
        return {
            messages
        }
    }
}