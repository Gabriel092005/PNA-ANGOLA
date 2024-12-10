import {Prisma, User } from "@prisma/client";


export interface usersRepository{
    
    findById(id : string|undefined): Promise <User | null> 
    Searchany(query:string|undefined, page:number):Promise<User[] >
    findByNip(nip:string):Promise<User|null>
    create(data:Prisma.UserCreateInput): Promise<User>
    remove(id:string):Promise<null>
    findAllTechnician(role:string):Promise<User[]>
    findPacientWithDiabetCount():Promise<number>
    findPacientWithHipertensaoCount():Promise<number>
    findTotalUsers():Promise<number>
    findTotalPacientCount():Promise<number>
    
    findUsersFilters(province?:string,municipality?:string,unidade?:string,nip?:string,page?:string):Promise<User[]>
}