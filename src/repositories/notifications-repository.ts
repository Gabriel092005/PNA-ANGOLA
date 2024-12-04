import { NotificationsRepository } from "./prisma/prisma-notifications-repository";
import { prisma } from "@/lib/prisma";


export class PrismaNotificatiosRepository implements NotificationsRepository{
  async GenerateNotification(receiverId:string){
         const notification = await prisma.notification.create({
            data:{
                status:false,
                user:{
                    connect:{id:receiverId}
                }
            }
         })
         return notification
    }
 async fetchAllNotification(userId:string){
    const notifications = await prisma.notification.findMany({
        where:{
            userId: userId
        },
        take:10
    })
    return notifications
        
       
    }

}