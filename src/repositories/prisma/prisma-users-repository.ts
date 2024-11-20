import { Prisma, User } from "@prisma/client";


export interface usersRepository{
    
    findById(id : string): Promise <User | null> 
    findByEmail( email : string) : Promise <User | null>
    Create(data:Prisma.UserCreateInput):Promise<User>
}