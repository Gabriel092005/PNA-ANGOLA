import { health_status } from "@prisma/client";


  
  export interface HealthRepository {
    findUserHealthStatus(userId:string):Promise<health_status[]>
    fetchUserStatus(userId:string):Promise<health_status[]>
    save(userId:string,blood_pressure:number,blood_glucose :number,id:number, cholesterol:number , weigth:number,  triglycerides  :number): Promise<health_status>;
  }
  