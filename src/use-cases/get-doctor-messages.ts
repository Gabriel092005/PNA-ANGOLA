import { MessagesRepository } from "@/repositories/prisma/prisma-messages.repository";
import { messages } from "@prisma/client";
import { resourceNotFoundError } from "./erros/resource-not-found-errors";

interface GetDoctorMessagesResponse{
    messages:messages
}

interface GetDoctorMessagesRequest{
    Id: string
}

export class GetDoctorMessagesUseCase{
    constructor( private messagesRepository:MessagesRepository){}
     async execute({Id}:GetDoctorMessagesRequest):Promise<GetDoctorMessagesResponse>{

         const messages = await this.messagesRepository.FindMessageUnique(Id)
    
         if(!messages){
            throw new resourceNotFoundError()
         }
         return{
            messages
         }

     }
}