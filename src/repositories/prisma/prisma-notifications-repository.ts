import { messages, notification } from "@prisma/client";

export interface NotificationsRepository{

    GenerateNotification(receiverId:string,name:string|undefined,data:string|undefined):Promise<notification|null>
    fetchAllNotification(receiverId:string,query:string|undefined):Promise<notification[]>
    deleteNotification(Id:string):Promise<null>
    

}