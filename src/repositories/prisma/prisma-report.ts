import { Report } from "@prisma/client"


export interface ReportRepository{

    createReport(title:string,content:string):Promise<Report>
    getRepportById(id:string):Promise<Report|null>
    

}