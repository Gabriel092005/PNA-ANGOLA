import { PrismaUserRepository } from "@/repositories/users-repository";
import { SendUserStatusUseCase } from "../send-user-status";
import { PrismaHealthRepository } from "@/repositories/health_status_repositoy";
import { PrismaNotificatiosRepository } from "@/repositories/notifications-repository";



export function makeSendHealthStatus(){

    const HealthRepository = new PrismaHealthRepository()
    const usersRepository = new PrismaUserRepository()
    const NotificationsRepository = new PrismaNotificatiosRepository()
    
    const UseCase = new SendUserStatusUseCase(HealthRepository,NotificationsRepository,usersRepository)
    return  UseCase
}