import { HealthRepository } from "./prisma/prisma-health_status-repository";
import { prisma } from "@/lib/prisma";

export class PrismaHealthRepository implements HealthRepository{
   async save(userId:string,blood_pressure:number,blood_glucose:number,cholesterol:number , weigth:number,  triglycerides  :number) {

          const health_status = await prisma.health_status.create({
            data:{

                blood_pressure:blood_pressure,
                blood_glucose:blood_glucose,
                cholesterol:cholesterol,
                weigth:weigth,
                triglycerides  :triglycerides,
                user:{
                    connect:{id:userId}
                }
            }
          })
          return health_status
    }
}