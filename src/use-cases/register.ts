import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { User } from "@prisma/client"
import { UserAreadyExistsError } from "./erros/user-already-exists"


interface RegisterUserRequest{
   name:string,
   status:string|undefined
   email:string|undefined
   nip:string
   province:string
   municipality:string|undefined
   unit:string|undefined
   bi:string|undefined
   born_at:string
   phone:any
   patente:string|undefined
   image_path:any
 

}

interface RegisterUserResponse{
    User:User
}

export class RegisterUserUseCase{
    constructor(private UsersRepository:usersRepository){}
    async execute({image_path,email, born_at,nip,name,phone,status,patente,municipality,bi,province,unit}:RegisterUserRequest):Promise<RegisterUserResponse>{
          if(!nip){

          }
           const userWithSameNip = await this.UsersRepository.findByNip(nip)
           if(userWithSameNip){
            throw new UserAreadyExistsError()
           }   
           const User = await this.UsersRepository.create({
            name,
            born_at,
            unidade:unit,
            bi,
            email,
            province,
            municipality,
            patente,
            phone,
            nip,
            status,
            image_path,
        
      
           }
          
           )   

         return{
            User
         }
    }
}