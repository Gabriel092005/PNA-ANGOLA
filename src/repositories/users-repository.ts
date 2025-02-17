import {Prisma, User} from "@prisma/client";
import { QueryProps, usersRepository } from "./prisma/prisma-users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements usersRepository{
  async totalAgentInactiveCount() {
    const count = await prisma.user.count({
      where:{
          role:'PACIENTE',AND:{isAlive:false}
          
      },
  })
  return count
}
  async inactiveAgents(page:string|undefined,query:string|undefined){
    if(query){
        console.log('query=',query)
      const user =await prisma.user.findMany({
        where:{
             name:query
            
        },
        take:1,
        // skip:((Number(page)-1)*5)
      })
      return user
    }
      const user =await prisma.user.findMany({
        where:{
            role:'PACIENTE',AND:{isAlive:false}
            
        },
        take:5,
        skip:((Number(page)-1)*5)
      })
      
      return user
  }
 async killPacient(userId: string){
        console.log()
         await prisma.user.update({
          where:{
            id:userId
          },data:{
             isAlive:false
          }
        })
        return null
  }
  async findUserAlive(){
       const womanInactive = await prisma.user.count({
        where:{
          role:{equals:'PACIENTE'},AND:{gender:'FEMENINO'}
        }
       })
       const manInactive = await prisma.user.count({where:{role:{equals:'PACIENTE'},AND:{gender:'MASCULINO',isAlive:true}}
       })
       const ActiveAgent = await  prisma.user.count({where:{isAlive:true,AND:{role:'PACIENTE'}}})

       const InactiveAgente = await prisma.user.count({where:{role:'PACIENTE',AND:{isAlive:false}}})
      
       const IsAliveAgent = {

        Woman:womanInactive,
        Man:manInactive,
        Alive:ActiveAgent,
        NotAlive:InactiveAgente,
    
       }
       return IsAliveAgent

  }
  async findUserGoodStateCount() {
       const pacientsBom  = await prisma.user.count({
        where:{
              role:'PACIENTE', AND:{status:'GOOD'}
        }
       }) 
       return pacientsBom
      
  }
 async findUserNormalStateCount(){
  const pacientsNormal  = await prisma.user.count({
    where:{
          role:'PACIENTE', AND:{status:'NORMAL'}
    }
   })
   return pacientsNormal
      
  }
  async findTotalTechnitian() {
    const techician = await prisma.user.count({
      where:{
        role:'TECNICO',
      }
     })
     return techician
  
  }

  async findUserBadStateCount(){
       const pacientsRisco = await prisma.user.count({
        where:{
          role:'PACIENTE', AND:{ status:'BAD'}
        }
       })
       return pacientsRisco
      
  }

async filterDataBy(province?:string,municipality?:string,gender?: string){
    const diabetico  = await prisma.user.count({where:{class:'DIABETICO',role:'PACIENTE'}})
    const hypertensive = await prisma.user.count({where:{class:'HIPERTENSO',role:'PACIENTE'}})
    const pacientsRisco = await prisma.user.count({where:{status:"BAD"}})
    const totalPacientes = await prisma.user.count({where:{role:'PACIENTE'}})
    let Metrics = {
      diabetico:diabetico,
      hipertenso:hypertensive,
      totalPacientes:totalPacientes,
      pacientsRisco:pacientsRisco
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
            const totalPacientes = await prisma.user.count({where:{municipality:municipality,role:'PACIENTE'}})
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
     return TotalPacient
  }
  async findPacientWithHipertensaoCount(){
    const usersWithHiper = await prisma.user.count({
      where:{
        class:'HIPERTENSO', AND:{role:'PACIENTE'}
      }
    })

    return usersWithHiper
  }
  async findPacientWithDiabetCount(){
      const usersWithDiabet = await prisma.user.count({
        where:{
          class:'DIABETICO', AND:{role:'PACIENTE'}
        }
      })
      return usersWithDiabet
  }
async  findAllTechnician(province?:string,unidade?:string,municipality?:string,page?:string) {

  console.log('province-repo:',province)  
  console.log('municipality:',municipality)  
  console.log('unidade:',unidade)  
  console.log('page:',page)  



      const users = await prisma.user.findMany({
        where:{
          ...({province:{contains:province}}),
          ...(municipality && {municipality:{contains:municipality}}),
          ...(unidade && {unidade:{contains:unidade}}),
          ...({role:{equals:"TECNICO"}})
        },take:5,
        include: {
            
        },
        orderBy:{
          created_at:'desc'
        },
        // skip:((Number(page))-1)*5
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
        },
    
      })
      return user
    }
    async findById(id: string) {
      
      const user = await prisma.user.findFirst({
        where: {
          id,
        },
        include: {
          _count:true,
          notification:{
            select:{
              id:true,
              userSenderName:true,
              content:true,
              created_at:true,
              userId:true,
              status:true, 

              user:{
                select:{
                  name:true
                }
              }
            },orderBy:{
              created_at:'desc'

            }
          },
          sent_messages:true,

          received_messages: {
            include:{
                sender:{
                  select:{
                    name:true 
                    
                  }
                }
            },

            take:5,
       
            // ...(province && {province:{contains:province}}),

            orderBy:{
              send_at:'desc'
            }
          },  // Supondo que a relação seja chamada 'messagesReceived'
          
        },
      
      });
      
      return user;
    }
    
}