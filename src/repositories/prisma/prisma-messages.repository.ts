import { messages } from "@prisma/client";



export interface MessagesRepository{

    sendMessage(content:string,senderId:string,receiverId:string):Promise<messages>
    FindAllMessage():Promise<messages[]>
    MessagesAmount(userId:string):Promise<number>
    OpenMessages(usersId:string,messageId:string):Promise<messages>

}