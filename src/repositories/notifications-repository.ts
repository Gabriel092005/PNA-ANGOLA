import { NotificationsRepository } from "./prisma/prisma-notifications-repository";
import { prisma } from "@/lib/prisma";


export class PrismaNotificatiosRepository implements NotificationsRepository{
    async deleteNotification(Id: string){
           await prisma.notification.delete({
              where:{
                id:Number(Id)
            }
           })
           return null
    }
  async GenerateNotification(receiverId:string,name:string,content:string){
         const notification = await prisma.notification.create({
            data:{
                status:false,
                userSenderName:name,

                content:content,
                user:{
                    connect:{id:receiverId},
                }
            }
         })
         return notification
    }
 async fetchAllNotification(userId:string,query:string|undefined){
    if(query){
           const notifications  = await prisma.notification.findMany({
            where:{
                userSenderName:query
            }
           })
           return notifications
    }
    const notifications = await prisma.notification.findMany({
        where:{
            userId: userId
        },
        take:10
    })
    return notifications
    }

}