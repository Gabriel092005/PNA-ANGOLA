import { NotificationsRepository } from "@/repositories/prisma/prisma-notifications-repository"
import { notification } from "@prisma/client"

interface fetchAllNotificationsRequest{
    userId:string
}

interface fetchAllNotificationsResponse{
    notification:notification[]
}

export class fetchAllNotificationUseCase{
    constructor(private notificationsRepository:NotificationsRepository){}

    async execute({userId}:fetchAllNotificationsRequest):Promise<fetchAllNotificationsResponse>{
        const notification = await this.notificationsRepository.fetchAllNotification(userId)
        return{
            notification
        }
    }
}