import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'; // Importando o rgb para cores

export class PdfService {
  async generatePdf(title: string, content: string){
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 1000]);
    const {height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
   
    const titleSize = 18;
    const contentSize = 12;


    const titleColor = rgb(0.2, 0.5, 0.8); // Cor azul
    const contentColor = rgb(0, 0, 0); // Cor preta


    page.drawText(title, {
      x: 50,
      y: height - 50, 
      size: titleSize,
      font: boldFont,
      color: titleColor,
    });


    page.drawText(content, {
      x: 50,
      y: height - 100, 
      size: contentSize,
      font: font,
      color: contentColor,
      lineHeight: 15, 
    });


    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes); 
  }
}
