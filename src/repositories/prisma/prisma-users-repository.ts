import {Prisma, User } from "@prisma/client";


export interface usersRepository{
    
    findById(id : string): Promise <User | null> 
    findByEmail( email : string) : Promise <User | null>
    Searchany(query:string|undefined, page:number):Promise<User[] >
    findByNip(nip:string):Promise<User|null>
    create(data:Prisma.UserUncheckedCreateInput): Promise<User>
    remove(id:string):Promise<null>
    findAllTechnician(role:string):Promise<User[]>
    findPacientWithDiabetCount():Promise<number>
    findPacientWithHipertensaoCount():Promise<number>
    findTotalUsers():Promise<number>
}