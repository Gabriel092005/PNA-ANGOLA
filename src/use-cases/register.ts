import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { User } from "@prisma/client"
import { UserAreadyExistsError } from "./erros/user-already-exists"


interface RegisterUserRequest{
   name:string,
   email:any
   status:string
   nip:string
   born_at:string
   phone:any
   adress:string
   image_path:any
   unit_adress:string
   unit_name:string

}

interface RegisterUserResponse{
    User:User
}

export class RegisterUserUseCase{
    constructor(private UsersRepository:usersRepository){}
    async execute({adress,image_path, born_at,email,nip,name,phone,status,unit_adress,unit_name}:RegisterUserRequest):Promise<RegisterUserResponse>{
           const userWithSameEmail = await this.UsersRepository.findByEmail(email)
           if(userWithSameEmail){
             throw new UserAreadyExistsError()
           }
           const userWithSameNip = await this.UsersRepository.findByNip(nip)
           if(userWithSameNip){
            throw new UserAreadyExistsError()
           }   
           const User = await this.UsersRepository.create({
            name,
            adress,
            born_at,
            email,
            phone,
            nip,
             status,
            image_path,
                unit_adress,
                unit_name
      
           }
          
           )   

         return{
            User
         }
    }
}