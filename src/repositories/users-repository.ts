import {Prisma} from "@prisma/client";
import { QueryProps, usersRepository } from "./prisma/prisma-users-repository";
import { prisma } from "@/lib/prisma";
export class PrismaUserRepository implements usersRepository{
  
  async filterDataBy(province?:string,municipality?:string,gender?: string){
    
    console.log('municipio=',municipality)
    console.log('gender=',gender)
    console.log('province=',province)
    let Metrics = {
      diabetico:0,
      hipertenso:0,
      totalPacientes:0,
      pacientsRisco:0
    }
    if(province){
      const diabetico  = await prisma.user.count(
              {
                where:{class:'DIABETICO',role:'PACIENTE', province:{contains:province },}
              }
            )
            const hypertensive = await prisma.user.count({
              where:{class:'HIPERTENSO',role:'PACIENTE',province:{contains:province}}
            })
            const totalPacientes = await prisma.user.count({where:{province:province,role:'PACIENTE'}})
            const pacientsRisco = await prisma.user.count({where:{status:"BAD"}})
            Metrics={
              diabetico:diabetico,
              hipertenso:hypertensive,
              pacientsRisco:pacientsRisco,
              totalPacientes:totalPacientes
            }
            return Metrics
          }
          if(municipality){
            console.log('entrei')
            const diabetico = await prisma.user.count({
              where:{class:'DIABETICO',role:'PACIENTE',municipality:{contains:municipality}}
            })
            const hypertensive = await prisma.user.count({
              where:{class:'HIPERTENSO',role:'PACIENTE',municipality:{contains:municipality}}
            })
            const totalPacientes = await prisma.user.count({where:{municipality:province,role:'PACIENTE'}})
            const pacientsRisco = await prisma.user.count({where:{role:'PACIENTE',status:"BAD"}})
            Metrics ={
              diabetico:diabetico,
              hipertenso:hypertensive,
              pacientsRisco:pacientsRisco,
              totalPacientes:totalPacientes
            }
            return Metrics
          }
       
              if(gender==='Masculino'){
                console.log('entrei')
                const diabetico = await prisma.user.count({
                  where:{class:'DIABETICO',role:'PACIENTE',gender:{equals:'MASCULINO'}}
                })
                const hypertensive = await prisma.user.count({
                  where:{class:'HIPERTENSO',role:'PACIENTE',gender:{equals:'MASCULINO'}}
                })
                const totalPacientes = await prisma.user.count({where:{gender:'MASCULINO',role:'PACIENTE'}})
                const pacientsRisco = await prisma.user.count({where:{gender:'MASCULINO', role:'PACIENTE',status:"BAD"}})
                Metrics ={
                   diabetico:diabetico,
                   hipertenso:hypertensive,
                   pacientsRisco:pacientsRisco,
                   totalPacientes:totalPacientes
              }
          }
          if(gender==='Femenino'){
            const diabetico = await prisma.user.count({
              where:{class:'DIABETICO',role:'PACIENTE',gender:{equals:'FEMENINO'}}
            })
            const hypertensive = await prisma.user.count({
              where:{class:'HIPERTENSO',role:'PACIENTE',gender:{equals:'FEMENINO'}}
            })
            const totalPacientes = await prisma.user.count({where:{gender:'FEMENINO',role:'PACIENTE'}})
            const pacientsRisco = await prisma.user.count({where:{gender:'MASCULINO', role:'PACIENTE',status:"BAD"}})
            Metrics =
            {
              diabetico:diabetico,
              hipertenso:hypertensive,
              pacientsRisco:pacientsRisco,
              totalPacientes:totalPacientes
             }
          }
        
        return  Metrics
  }
 async iSactiveUser(userId: string){
   const user = await prisma.user.update({
    where:{
        id:userId
    },data:{
      isAlive:false
    }
   })
       return user
  }
  
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
          class:'DIABETICO'
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
        class:'HIPERTENSO' 
      }
    })

    return usersWithHiper
  }
  async findPacientWithDiabetCount(){
      const usersWithDiabet = await prisma.user.count({
        where:{
          class:'DIABETICO'
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
 async Searchany(query:QueryProps|undefined,page:number){
  const users = await prisma.user.findMany({
    take: 3, skip:(page-1)*3, orderBy:{
      created_at:'desc'
    }
  })

   if(query?.NORMAL=='NORMAL'){
    const users = await prisma.user.findMany(
      {
    where:{
      status:{
        equals:'NORMAL'
      }
     },take:2,
     orderBy:{
      created_at:'desc'
     },
     skip:(page-1)*2
    }
    )
     return users
   }
   if(query?.BAD=='BAD'){
    const users = await prisma.user.findMany(
      {
    where:{
      status:{
        equals:'BAD'
      }
     },take:2,
     orderBy:{
      created_at:'desc'
     },
     skip:(page-1)*2
    }
    )
     return users
   }
   if(query?.GOOD=='GOOD'){
    const users = await prisma.user.findMany(
      {
    where:{
      status:{
        equals:'GOOD'
      }
     },take:2,orderBy:{created_at:'desc'},
       skip:(page-1)*2
    }
    )
     return users
   }
   return users
  }
  async create(data: Prisma.UserCreateInput){
       
        const users = await prisma.user.create({
          data:{
            name:data.name,
            province:data.province,
            bi:data.bi,
            born_at:data.born_at,
            created_at:data.created_at,
            email:data.email,
            municipality:data.municipality,
            unidade:data.unidade,
            status:data.status,
            role:data.role,
            gender:data.gender,
            nip:data.nip,
            patente:data.patente,
            phone:data.phone,
            image_path:data.image_path,
            class:data.class,
          }
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