import { User, Prisma } from "@prisma/client";
import { usersRepository } from "./prisma/prisma-users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements usersRepository{
  async create(data: Prisma.UserUncheckedCreateInput){
        const users = await prisma.user.create({
          data
        })
        return users
   }


   async findByNip(nip: string){
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
   async findByEmail(email: string){
      const users = await prisma.user.findUnique({
        where:{
            email
        }
      })
      return users
    
         
    }


}