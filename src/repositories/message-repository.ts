import { prisma } from "@/lib/prisma";
import { MessagesRepository } from "./prisma/prisma-messages.repository";
;

export class PrismaMessagesRepository implements MessagesRepository{
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