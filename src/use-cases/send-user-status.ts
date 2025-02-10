import { HealthRepository } from "@/repositories/prisma/prisma-health_status-repository";
import { health_status } from "@prisma/client";

interface SendUserStatusRequest{

        
        blood_pressure: number;
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
   
   constructor (private Health_Repository:HealthRepository){}

   async execute({blood_pressure,userId,blood_glucose,cholesterol,weigth,triglycerides}:SendUserStatusRequest):Promise<SendUserStatusResponse>{
     
      const health_status = await this.Health_Repository.save(userId,blood_pressure,blood_glucose,cholesterol,weigth,triglycerides)
      
      return{
        health_status
      }
   }
}