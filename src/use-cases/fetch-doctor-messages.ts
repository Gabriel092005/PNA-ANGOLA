import { MessagesRepository } from "@/repositories/prisma/prisma-messages.repository";
import { messages } from "@prisma/client";
import { resourceNotFoundError } from "./erros/resource-not-found-errors";

interface fetchDoctorMessagesResponse{
    messages:messages[]
}

interface fetchDoctorMessagesRequest{
    userId:string
}

export class fetchDoctorMessagesUseCase{
    constructor( private messagesRepository:MessagesRepository){}
     async execute({userId}:fetchDoctorMessagesRequest):Promise<fetchDoctorMessagesResponse>{

         const messages = await this.messagesRepository.FindMessagesDoctor(userId)
         if(!messages){
            throw new resourceNotFoundError()
         }
         return{
            messages
         }

     }
}