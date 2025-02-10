import { messages } from "@prisma/client";



export interface MessagesRepository{

    sendMessage(content:string,subject:string,senderId:string,receiverId:string):Promise<messages>
    FindAllMessage(query?:string):Promise<messages[]>
    FindMessagesDoctor(userId:string):Promise<messages[]>
    
    FindMessageUnique(Id:string):Promise<messages | null>
    MessagesAmount(userId:string):Promise<number>
    DeleteMessages(Id:string):Promise<null>
    OpenMessages(usersId:string,messageId:string):Promise<messages>

}