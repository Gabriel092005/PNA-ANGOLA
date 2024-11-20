import {Prisma, User } from "@prisma/client";


export interface usersRepository{
    
    findById(id : string): Promise <User | null> 
    findByEmail( email : string) : Promise <User | null>
    findByNip(nip:string):Promise<User|null>
    create(data:Prisma.UserUncheckedCreateInput): Promise<User>;
}