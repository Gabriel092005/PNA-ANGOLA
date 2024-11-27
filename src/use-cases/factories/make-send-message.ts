import { PrismaMessagesRepository } from "@/repositories/message-repository";
import { SendMessageUseCase } from "../send-messages";
import { PrismaUserRepository } from "@/repositories/users-repository";
import { PrismaNotificatiosRepository } from "@/repositories/notifications-repository";


export function makeSendMessage(){
     const messagesRepository = new PrismaMessagesRepository()
     const NotificationsRepository = new PrismaNotificatiosRepository()
     const usersRepository = new PrismaUserRepository()
     const usecase = new SendMessageUseCase(messagesRepository,usersRepository,NotificationsRepository)
     return usecase
}