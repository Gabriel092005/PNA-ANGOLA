import { Report } from "@prisma/client";
import { ReportRepository } from "./prisma/prisma-report";
import { prisma } from "@/lib/prisma";

export class PrismaReportRepository implements ReportRepository{
  async getRepportById(id:string){
        const report= await prisma.report.findUnique({
        where:{
            id
        }
      })
      return report
   }
   async createReport(title:string,content:string) {
    const report = await prisma.report.create({
        data:{
            title,
            content
        }
      })
      return report
        
    }

}