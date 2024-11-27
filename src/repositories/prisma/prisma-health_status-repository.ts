import { health_status } from "@prisma/client";


  
  export interface HealthRepository {
    save(userId:string,blood_pressure:number,blood_glucose :number, cholesterol:number , weigth:number,  triglycerides  :number): Promise<health_status>;
  }
  