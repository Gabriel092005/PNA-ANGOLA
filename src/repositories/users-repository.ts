import {Prisma, User } from "@prisma/client";
import { usersRepository } from "./prisma/prisma-users-repository";
import { prisma } from "@/lib/prisma";
export class PrismaUserRepository implements usersRepository{
  
  async findTotalPacientCount(){
    const TotalPacient = await prisma.user.count({where:{role:'PACIENTE'}})
    return TotalPacient
      
  }
 async findUsersFilters(province?: string, municipality?: string, unidade?: string, nip?: string, page?:string) {
   if(!page){
     throw new Error()
    }
    
  const users = await prisma.user.findMany({
                where:{
                  ...(province && {province:{contains:province}}),
                  ...(municipality && {municipality:{contains:municipality}}),
                  ...(unidade && {unidade:{contains:unidade}}),
                  ...(nip && {nip:{contains:nip}}),
                  ...({role:{equals:"PACIENTE"}})
                },take:5,
                orderBy:{
                  created_at:'desc'
                },
                skip:(parseInt(page)-1)*5
                
            })
            return users
  }

 async getPatientsByDateRange(startDate: string, endDate: string){
       const patient = await prisma.user.findMany({
        where:{
          created_at:{
              gte:startDate,
              lte:endDate
          },
          role:'PACIENTE',
          status:'diabetico'
        }
       })
       return patient.map((patient)=>{
         ([{
          id:patient.id,
          status:patient.status,
          created_at:patient.created_at
         }]
   
        )
       })
  }
  async findTotalUsers(){
     const TotalPacient = await prisma.user.count({
      where:{
        role:'PACIENTE'
      }
     })
     console.log(TotalPacient)
     return TotalPacient
      
  }
  async findPacientWithHipertensaoCount(){
    const usersWithHiper = await prisma.user.count({
      where:{
        status:'hipertenso' 
      }
    })

    return usersWithHiper
  }
  async findPacientWithDiabetCount(){
      const usersWithDiabet = await prisma.user.count({
        where:{
          status:'diabetico'
        }
      })
      return usersWithDiabet
  }
async  findAllTechnician(role:string,) {
      const users = await prisma.user.findMany({
        where:{
           role:{
            equals:'TECNICO'
           }
        },take:10,
        
      })
      return users
      
  }

 async remove(id: string){
     await prisma.user.delete({
      where:{
        id:id
      }
    })
    return null
  }
 
 async Searchany(query:string,page:number){
  console.log(query)


  const users = await prisma.user.findMany({
    take: 10, skip:(page-1)*10
  })

   if(query){
    const users = await prisma.user.findMany(
      {
    where:{
      status:{
        contains:query
      }
     },take:2,
     skip:(page-1)*2
    }
    )

     return users
   }
  
   return users
   
    
  }
  async create(data: Prisma.UserCreateInput){
        const users = await prisma.user.create({
          data
        })
        
        return users
   }


   async findByNip(nip: string|undefined){
      const user = await prisma.user.findFirst({
        where:{
            nip
        }
      })
      return user
      
    }
   async  findById(id: string){
      const users = await prisma.user.findFirst({
        where:{
            id
        }
      })
      return users

    }


    
         
    


}