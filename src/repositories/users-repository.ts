import { User, Prisma } from "@prisma/client";
import { usersRepository } from "./prisma/prisma-users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepository implements usersRepository{
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
  async Create(data: Prisma.UserCreateInput) {
       const users = await prisma.user.create({
        data
       })
       return users
    }

}