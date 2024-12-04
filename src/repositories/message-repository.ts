import { prisma } from "@/lib/prisma";
import { MessagesRepository } from "./prisma/prisma-messages.repository";
import { messages } from "@prisma/client";
;

export class PrismaMessagesRepository implements MessagesRepository{
async  OpenMessages(usersId: string,messageId:string) {
     const messages = await prisma.messages.update({
      where:{
        id:Number(messageId),
        receiverId:usersId
      },
      data:{
         status:true
      }
     })
     return messages
    
  }
  async MessagesAmount(userId:string) {
       const Amount  = await prisma.messages.count({
        where:{
          receiverId:userId
        }
       })
       return Amount
  }
  async FindAllMessage(userId:string){
   const message = await prisma.messages.findMany()
   return message 
   }

   async sendMessage(content: string,receiverId: string, senderId: string){
        const messages = await prisma.messages.create({
           data:{
            content:content,
            receiverId:receiverId,
            senderId:senderId
           }
        }) 
        return messages
    }

}