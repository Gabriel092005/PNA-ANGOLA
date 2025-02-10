import { MessagesRepository } from "@/repositories/prisma/prisma-messages.repository";


interface DeleteMessagesRequest{
    Id:string
}

export class DeleteMessagesUseCase{
    constructor (private MessagesRepository:MessagesRepository){}

    async execute({Id}:DeleteMessagesRequest):Promise<null>{
          await this.MessagesRepository.DeleteMessages(Id)
          return null
    }
}