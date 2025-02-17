import { HealthRepository } from "./prisma/prisma-health_status-repository";
import { prisma } from "@/lib/prisma";

export class PrismaHealthRepository implements HealthRepository{
 async GetHealthStatusOne(userId: string) {
         const health_status  = await prisma.health_status.findMany({
              where:{
                  userId:userId
              },
               take:5,
               orderBy:{
                created_at:'asc'
               },
         })
          return health_status
    }
   async PacientsWithDiabetics() {
        const  PacientsWithDiabetics = await prisma.user.groupBy({
            by:['province'],
            where:{
               class:'DIABETICO', AND:{
                 role:'PACIENTE'
               }
            },
            _count:{
              id:true
            }
      }) 
      return PacientsWithDiabetics
    }
   async totalPacientsPerProvince(){
        const  totalPacientsPerProvince = await prisma.user.groupBy({
            by:['province'],
            where:{
                role:'PACIENTE'
            },
            _count:{
                id:true
            }
           })
           return totalPacientsPerProvince
    }

  async deleteHealthStatus(Id:string){
           await prisma.health_status.delete({
            where:{
                id:Number(Id)
            }
        })
        return null
      
    }
   async fetchUserStatus(userId: string){
     const  health_status = await prisma.health_status.findMany({
        where:{
            userId:userId
        },take:7,
        orderBy:{
            created_at:'desc'
        }
     })
     return health_status
    }
  async findUserHealthStatus(userId:string){
       const health_status = await prisma.health_status.findMany({
        where:{
            userId:userId
        },take:1,
        orderBy:{
            created_at:'desc'
        }
       })
       return health_status
   }
   async save(userId:string,blood_glucose:number,cholesterol:number , weigth:number,  triglycerides  :number,siastolic:number,diastolic:number) {    
   
          const health_status = await prisma.health_status.create({
            data:{
                sistolic:siastolic,
                diastolic:diastolic,
                blood_glucose:blood_glucose,
                cholesterol:cholesterol,
                weigth:weigth,
                triglycerides:triglycerides,
                user:{
                    connect:{id:userId}
                }
            }
          })
          if((blood_glucose>150)){
            
            await prisma.user.update({
                where:{
                    id:userId
                },data:{
                    status:'BAD'
                }
            })
            await prisma.health_status.update({
                where:{  
                    id:health_status.id
                },data:{
                   status_now:'BAD'
                }
             })
             if(triglycerides>10){
                await prisma.health_status.update({
                    where:{
                        id:health_status.id,
                    },data:{
                        status_now:'GOOD'
                    }
                })
             }
             
      }
          return health_status
    }
}