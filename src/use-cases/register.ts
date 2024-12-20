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
   image_path:string|undefined

}

interface RegisterUserResponse{
    User:User
}

export class RegisterUserUseCase{
    constructor(private UsersRepository:usersRepository){}
    async execute({email, born_at,nip,name,phone,status,patente,municipality,bi,province,unit,image_path}:RegisterUserRequest):Promise<RegisterUserResponse>{
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
            patente:patente,
            municipality,
            phone,
            nip,
            status,
            image_path:image_path
           }
          
           )   

         return{
            User
         }
    }
}