import { deleteNotificationUseCase } from "../delete-notif";
import { PrismaNotificatiosRepository } from "@/repositories/notifications-repository";




export  function makeDeleteNotif(){

     const NotificationsRepository =  new  PrismaNotificatiosRepository()
     const usecase  = new deleteNotificationUseCase(NotificationsRepository)
     return usecase
}