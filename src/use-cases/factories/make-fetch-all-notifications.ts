import { PrismaNotificatiosRepository } from "@/repositories/notifications-repository";
import { fetchAllNotificationUseCase } from "../fetch-notifications";


export async function makeFetchAllNotifications(){
    const notificationsRepository = new PrismaNotificatiosRepository()
    const usecase = new fetchAllNotificationUseCase(notificationsRepository)
    return usecase
}