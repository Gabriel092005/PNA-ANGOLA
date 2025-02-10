import {Prisma, User } from "@prisma/client";

interface Metrics {
    diabetico:number
    hipertenso:number
    totalPacientes:number
    pacientsRisco:number
}
export interface QueryProps{
    GOOD:'GOOD'
    NORMAL:'NORMAL'
    BAD:'BAD'
}

interface IsAliveAgent{
     Woman:number,
     Man:number,
     Alive:number,
     NotAlive:number,
   
}
export interface usersRepository{
    inactiveAgents(query:string|undefined,page:string|undefined):Promise<User[]>
    totalAgentInactiveCount():Promise<number>
    findById(id : string|undefined): Promise <User | null> 
    killPacient(Nip:string):Promise<null>
    findUserAlive():Promise<IsAliveAgent>
    findUserBadStateCount():Promise<number>
    findUserGoodStateCount():Promise<number>
    findUserNormalStateCount():Promise<number>
    Searchany(query:QueryProps, page:number):Promise<User[] >
    findByNip(nip:string):Promise<User|null>
    create(data:Prisma.UserCreateInput): Promise<User>
    remove(id:string):Promise<null>
    findTotalTechnitian():Promise<number>
    findAllTechnician(province?:string,municipality?:string,unidade?:string,page?:string):Promise<User[]>
    findPacientWithDiabetCount():Promise<number>
    findPacientWithHipertensaoCount():Promise<number>
    findTotalUsers():Promise<number>
    findTotalPacientCount():Promise<number>
    iSactiveUser(userId:string):Promise<User>
    filterDataBy(date?:string,province?:string,municipality?:string,gender?:string,unidade?:string):Promise<Metrics>
    findUsersFilters(province?:string,municipality?:string,unidade?:string,nip?:string,page?:string):Promise<User[]>
}