import { NotificationsRepository } from "@/repositories/prisma/prisma-notifications-repository"
import { notification } from "@prisma/client"

interface fetchAllNotificationsRequest{
    userId:string
    query:string|undefined
}

interface fetchAllNotificationsResponse{
    notification:notification[]
}

export class fetchAllNotificationUseCase{
    constructor(private notificationsRepository:NotificationsRepository){}

    async execute({userId,query}:fetchAllNotificationsRequest):Promise<fetchAllNotificationsResponse>{
        const notification = await this.notificationsRepository.fetchAllNotification(userId,query)
        return{
            notification
        }
    }
}