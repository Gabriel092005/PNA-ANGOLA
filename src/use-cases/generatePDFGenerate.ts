import { PdfService } from "@/services/servicesPDF";

export class GeneratePdfUseCase {
  constructor(private pdfService: PdfService) {}

  // O método execute agora aguarda a Promise ser resolvida
  async execute(data: { title: string; content: string }): Promise<Buffer> {
    return await this.pdfService.generatePdf(data.title, data.content);
  }
}
