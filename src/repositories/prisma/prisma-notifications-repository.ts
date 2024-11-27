import { messages, notification } from "@prisma/client";

export interface NotificationsRepository{

    GenerateNotification(receiverId:string):Promise<notification>
    fetchAllNotification(receiverId:string):Promise<notification[]>
    

}