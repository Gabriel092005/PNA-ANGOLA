import { HealthRepository } from "@/repositories/prisma/prisma-health_status-repository";
import { NotificationsRepository } from "@/repositories/prisma/prisma-notifications-repository";
import { usersRepository } from "@/repositories/prisma/prisma-users-repository";
import { health_status } from "@prisma/client";

interface SendUserStatusRequest{
   sistolic:number,
   diastolic:number,
        blood_glucose:number
        cholesterol:number , 
        weigth:number
        triglycerides  :number
        userId:string
}

interface SendUserStatusResponse{
    health_status:health_status
}

export class SendUserStatusUseCase {
   constructor (
      private Health_Repository:HealthRepository,
      private NotifRepository:NotificationsRepository,
      private UsersRepository:usersRepository
   ){}

async execute({diastolic,sistolic,userId,blood_glucose,cholesterol,weigth,triglycerides}:SendUserStatusRequest):Promise<SendUserStatusResponse>{
    
      const user=await this.UsersRepository.findById(userId)
      const adminId  = '1d230414-a57f-4bb7-a5ab-8358d0692481'
      const message = `O limite de glicemia do ${user?.name} está muito alto `
          
       if(blood_glucose>150)
       {
          await this.NotifRepository.GenerateNotification(userId,user?.name,message)
          await this.NotifRepository.GenerateNotification(adminId,user?.name,message)
       }

      const health_status = await this.Health_Repository.save(userId,sistolic,diastolic,blood_glucose,cholesterol,weigth,triglycerides)
      
      return{
        health_status
      }
   }
}