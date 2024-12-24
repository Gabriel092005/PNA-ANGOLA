import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'; // Importando o rgb para cores

export class PdfService {

  async generatePdf(title: string, diabetico: string, hipertenso: string, pacientesRiscos: string, totalPacientes: string) {
    const pdfDoc = await PDFDocument.create();
    
    const page = pdfDoc.addPage([600, 1000]);

    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const titleSize = 18;
    const contentSize = 12;
    const titleColor = rgb(0.2, 0.5, 0.8); // Cor azul
    const contentColor = rgb(0, 0, 0); // Cor preta

    
    const currentDate = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

       page.drawText(title, {
      x: 50,
      y: height - 60,
      size: titleSize,
      font: boldFont,
      color: titleColor,
    });


    page.drawText(`Data: ${currentDate}`, {
      x: 50,
      y: height - 100, 
      size: contentSize,
      font: font,
      color: contentColor,
    });

    
    const startY = height - 190; 
    const rowHeight = 45;
    const col1X = 50;
    const col2X = 250;
    const colWidth = 250;


    page.drawText('Indicador', {
      x: col1X,
      y: startY,
      size: contentSize,
      font: boldFont,
      color: contentColor,
    });

    page.drawText('Valor', {
      x: col2X,
      y: startY,
      size: contentSize,
      font: boldFont,
      color: contentColor,
    });

    const headerMargin = 15; 
    const tableStartY = startY - rowHeight - headerMargin;

    const rows = [
      { label: 'Hipertensos', value: hipertenso },
      { label: 'Pacientes em Risco', value: pacientesRiscos },
      { label: 'Total de Pacientes', value: totalPacientes },
      { label: 'Diabéticos', value: diabetico },
    ];

    // Desenhando a borda da tabela
    page.drawRectangle({
      x: col1X - 5,
      y: tableStartY + 5,
      width: colWidth + 150,
      height: rowHeight * (rows.length + 1), // Ajustando a altura para a quantidade de linhas
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
    });

    // Adicionando espaço para assinatura
    const signatureY = tableStartY - rowHeight * rows.length - 60; // Espaço abaixo da tabela
    page.drawText('Assinatura do Diretor:', {
      x: 50,
      y: signatureY,
      size: contentSize,
      font: boldFont,
      color: contentColor,
    });

    // Linha para assinatura
    page.drawLine({
      start: { x: 50, y: signatureY - 5 },
      end: { x: 550, y: signatureY - 5 },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });

    // Gerar o PDF
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }
}
