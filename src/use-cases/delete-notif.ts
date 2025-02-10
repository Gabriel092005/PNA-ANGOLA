import { NotificationsRepository } from "@/repositories/prisma/prisma-notifications-repository";


interface deleteNotificationRequest {
    Id:string
}

export class deleteNotificationUseCase {
    constructor(private notificationRepository:NotificationsRepository){}

    async execute({Id}:deleteNotificationRequest):Promise<null>{
           this.notificationRepository.deleteNotification(Id)
           return null
    }
}