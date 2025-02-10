import { prisma } from "@/lib/prisma";
import { MessagesRepository } from "./prisma/prisma-messages.repository";


export class PrismaMessagesRepository implements MessagesRepository {
   async DeleteMessages(Id: string){
       await prisma.messages.delete({
         where:{
            id:Number(Id)
         }
       })
       return null
   }
   async FindMessageUnique(Id: string){
      console.log(Number(Id))

        const messages = await prisma.messages.findFirst({
         where:{
            id:Number(Id)
         }
        })
        await prisma.messages.update({
         where:{
            id:Number(Id)
         },
         data:{
            status:true
         }
        })
        return messages
   }
  async FindMessagesDoctor(userId: string){
      const messages  = await prisma.messages.findMany({
         where:{
            receiverId:userId,
             AND:{
               receiver:{
                  role:'TECNICO'
               }
             },

         }
      })
      return messages
   }
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
  async FindAllMessage(query?: string) {
   if (query) {
     // Quando houver a query, retorna as mensagens que contenham esse conteúdo.
     console.log('queryRepository=', query);
 
     const message = await prisma.messages.findMany({
       where: 
       
       {
          OR:[
             {
               content: { contains: query}
             },
             {
               subject:{contains:query}
             },
          ]

       },
       orderBy: {
         send_at: 'desc', // Ordena por data de envio, da mais recente para a mais antiga.
       },
       take: 5, // Limita a 5 mensagens.
       include: {
         receiver: { // Inclui os dados do receiver.
           select: {
             id: true,  // Seleciona o ID do receiver.
             name: true, // Seleciona o nome do receiver.
           },
         },
       },
     });
 
     return message; // Retorna as mensagens filtradas.
   } else {
     // Quando não houver a query, retorna as últimas 5 mensagens do 'ADMIN'.
     const message = await prisma.messages.findMany({
       where: {
         sender: {
           role: {
             equals: 'ADMIN', // Filtro para mensagens enviadas pelo ADMIN.
           },
         },
       },
       orderBy: {
         send_at: 'desc', // Ordena por data de envio, da mais recente para a mais antiga.
       },
       take: 5, // Limita a 5 mensagens.
       include: {
         receiver: { // Inclui os dados do receiver.
           select: {
             id: true,  // Seleciona o ID do receiver.
             name: true, // Seleciona o nome do receiver.
           },
         },
       },
     });
 
     return message; // Retorna as mensagens padrão.
   }
 }
 
   async sendMessage(content: string,receiverId: string, senderId: string,subject:string){
      console.log("senderId:",senderId)

      const senderExists = await prisma.user.findFirst({ where: { id: senderId } });
      const receiverExists = await prisma.user.findFirst({ where: { id: receiverId } });
    
      if (!senderExists) {
        throw new Error('Sender ID does not exist');
      }
    
      if (!receiverExists) {
        throw new Error('Receiver ID does not exist');
      }
    
        const messages = await prisma.messages.create({
           data:{
            content:content,
            subject:subject,
            receiverId:receiverId,
            senderId:senderId
           }
        }) 
        return messages
    }

}