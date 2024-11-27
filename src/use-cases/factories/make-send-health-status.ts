import { SendUserStatusUseCase } from "../send-user-status";
import { PrismaHealthRepository } from "@/repositories/health_status_repositoy";



export function makeSendHealthStatus(){
    const HealthRepository = new PrismaHealthRepository()
    const UseCase = new SendUserStatusUseCase(HealthRepository)
    return  UseCase
}