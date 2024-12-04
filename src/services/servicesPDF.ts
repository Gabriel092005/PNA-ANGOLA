import { PDFDocument, StandardFonts } from 'pdf-lib'; // Certifique-se de importar StandardFonts


export class PdfService {
  async generatePdf(title: string, content: string): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const textSize = 12;

    page.drawText(content, {
      x: 50,
      y: height - 100,
      size: textSize,
      font,
    });

    const pdfBytes = await pdfDoc.save(); // O PDF é gerado de forma assíncrona
    return Buffer.from(pdfBytes); // Converte os bytes para um Buffer
  }
}
