import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'; // Importando o rgb para cores

export class PdfService {

  async generatePdf(title: string, diabetico: string, hipertenso: string, pacientesRiscos: string, totalPacientes: string) {
    const pdfDoc = await PDFDocument.create();
    
    const page = pdfDoc.addPage([600, 1000]);

    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const titleSize = 22;  // Aumentamos o tamanho do título para mais destaque
    const contentSize = 14;  // Tamanho de conteúdo maior
    const titleColor = rgb(0.2, 0.5, 0.8); // Cor azul para o título
    const contentColor = rgb(0, 0, 0); // Cor preta para o conteúdo

    // Data formatada
    const currentDate = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Título do PDF
    page.drawText(title, {
      x: 50,
      y: height - 60,
      size: titleSize,
      font: boldFont,
      color: titleColor,
    });

    // Data atual
    page.drawText(`Data: ${currentDate}`, {
      x: 50,
      y: height - 100,
      size: contentSize,
      font: font,
      color: contentColor,
    });

    // Início da tabela
    const startY = height - 170; 
    const rowHeight = 45;
    const col1X = 50;
    const col2X = 300; // Ajustamos a posição para melhor alinhamento
    const colWidth = 230;

    // Cabeçalho da tabela (negrito e centralizado)
    page.drawText('Indicador', {
      x: col1X + 5,
      y: startY,
      size: contentSize,
      font: boldFont,
      color: contentColor,
    });

    page.drawText('Valor', {
      x: col2X + 5,
      y: startY,
      size: contentSize,
      font: boldFont,
      color: contentColor,
    });

    const headerMargin = 10;
    const tableStartY = startY - rowHeight - headerMargin;

    // Linhas da tabela
    const rows = [
      { label: 'Hipertensos', value: hipertenso },
      { label: 'Pacientes em Risco', value: pacientesRiscos },
      { label: 'Total de Pacientes', value: totalPacientes },
      { label: 'Diabéticos', value: diabetico },
    ];

    // Desenhando as linhas da tabela
    rows.forEach((row, index) => {
      const yPosition = tableStartY - index * rowHeight;
      
      // Desenhando as células
      page.drawText(row.label, {
        x: col1X + 10,
        y: yPosition,
        size: contentSize,
        font: font,
        color: contentColor,
      });

      page.drawText(row.value, {
        x: col2X + 10,
        y: yPosition,
        size: contentSize,
        font: font,
        color: contentColor,
      });
    });

    // Desenhando a borda da tabela
    page.drawRectangle({
      x: col1X - 5,
      y: tableStartY + 5,
      width: colWidth + 150,
      height: rowHeight * (rows.length + 1),
      borderColor: rgb(0.8, 0.8, 0.8),
      borderWidth: 1,
      opacity: 0.5, // Fazendo a borda mais suave
    });

    // Adicionando uma linha de separação após a tabela
    const lineY = tableStartY - rowHeight * rows.length - 10;
    page.drawLine({
      start: { x: 50, y: lineY },
      end: { x: 550, y: lineY },
      thickness: 2,
      color: rgb(0.2, 0.5, 0.8), // Azul suave para separar a seção
    });

    // Adicionando espaço para assinatura
    const signatureY = lineY - 40; // Espaço abaixo da linha de separação
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
