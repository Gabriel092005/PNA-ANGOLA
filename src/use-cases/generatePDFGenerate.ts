import { PdfService } from "@/services/servicesPDF";

export class GeneratePdfUseCase {
  constructor(private pdfService: PdfService) {}

  async execute(data: {
      title: string;
      diabetico:string;
      hipertenso:string;
      totalPacients:string;
      pacientesRiscos:string

      ; }): Promise<Buffer> {
    return await this.pdfService.generatePdf(
      data.title, 
      data.diabetico,
      data.hipertenso,
      data.pacientesRiscos,
      data.totalPacients
    );
  }
}
