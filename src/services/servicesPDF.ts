import { PDFDocument, StandardFonts, rgb, cmyk } from 'pdf-lib'; // Importando o cmyk para mais opções de cores

export class PdfService {
  async generatePdf(
    title: string,
    diabetico: string,
    hipertenso: string,
    pacientesRiscos: string,
    totalPacientes: string
  ) {
    const pdfDoc = await PDFDocument.create();
    
    const page = pdfDoc.addPage([600, 1000]);

    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const titleSize = 28;  // Tamanho do título para destaque
    const contentSize = 16;  // Tamanho de conteúdo maior
    const titleColor = rgb(0.2, 0.5, 0.8); // Cor azul para o título
    const contentColor = rgb(0, 0, 0); // Cor preta para o conteúdo

    // Data formatada
    const currentDate = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Capa do PDF
    page.drawRectangle({
      x: 0,
      y: height - 300,
      width: 600,
      height: 300,
      color: cmyk(0.1, 0.3, 0.5, 0),
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

    // Início da tabela
    const startY = height - 200; 
    const rowHeight = 45;
    const col1X = 50;
    const col2X = 300; // Ajustamos a posição para melhor alinhamento
    const colWidth = 230;

    // Cabeçalho da tabela (negrito e centralizado)
    page.drawRectangle({
      x: col1X - 5,
      y: startY + rowHeight - 5,
      width: colWidth + 150,
      height: rowHeight + 10,
      color: rgb(0.9, 0.9, 0.9),
    });

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

    // Cores alternadas para linhas
    const rowColors = [rgb(0.9, 0.95, 1), rgb(1, 1, 1)];

    // Desenhando as linhas da tabela
    rows.forEach((row, index) => {
      const yPosition = tableStartY - index * rowHeight;

      // Cor da linha
      const rowColor = rowColors[index % 2];
      page.drawRectangle({
        x: col1X - 5,
        y: yPosition - 5,
        width: colWidth + 150,
        height: rowHeight + 10,
        color: rowColor,
      });

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
