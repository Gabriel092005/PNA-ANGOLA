import { usersRepository } from "@/repositories/prisma/prisma-users-repository"
import { User } from "@prisma/client"
import { UserAreadyExistsError } from "./erros/user-already-exists"

interface RegisterUserRequest{
   name:string,
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
   status :'NORMAL'|'GOOD'|'BAD'|undefined
   role:'ADMIN'|'TECNICO'|'PACIENTE'
   gender:'MASCULINO'|'FEMENINO'
   classe:'DIABETICO'|'HIPERTENSO'
}

interface RegisterUserResponse{
    User:User
}

export class RegisterUserUseCase{
    constructor(private UsersRepository:usersRepository){}
    async execute({email,born_at,nip,name,phone,status,patente,municipality,bi,province,unit,image_path,gender,classe,role,}:RegisterUserRequest):Promise<RegisterUserResponse>{
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
            status:status,
            role:role,
            gender:gender,
            image_path:image_path,
            class:classe
           }
        )   

         return{
            User
         }
    }
}