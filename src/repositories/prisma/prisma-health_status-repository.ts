import { health_status } from "@prisma/client";



  interface totalPacientsPerProvince{
    province: string; // Provincia onde o paciente está localizado
    _count: {
      id: number; // Contagem de pacientes com a classe 'DIABETICO'
    };
  }
  interface PacientsWithDiabetics{
    province: string; // Provincia onde o paciente está localizado
    _count: {
      id: number; // Contagem de pacientes com a classe 'DIABETICO'
    };
  }


  
  export interface HealthRepository {
    findUserHealthStatus(userId:string):Promise<health_status[]>
    fetchUserStatus(userId:string):Promise<health_status[]>
    deleteHealthStatus(Id:string):Promise<null>
    totalPacientsPerProvince():Promise<totalPacientsPerProvince[]>
    PacientsWithDiabetics():Promise<PacientsWithDiabetics[]>
    save(userId:string,blood_pressure:number,blood_glucose :number,id:number, cholesterol:number , weigth:number,  triglycerides  :number): Promise<health_status>;
  }
  