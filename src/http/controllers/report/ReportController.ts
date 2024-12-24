import { FastifyReply, FastifyRequest } from 'fastify';
import { PdfService } from '@/services/servicesPDF';
import { z } from 'zod';
import { GeneratePdfUseCase } from '@/use-cases/generatePDFGenerate';

export async function Generate(req: FastifyRequest, res: FastifyReply) {
  try {
    const GeneratePDFBody = z.object({
      title: z.string().optional().default('Estatisticas'),
      diabetico:z.string().default('0'),
      hipertenso:z.string().default('0'),
      totalPacients:z.string().default('0'),
      pacientesRiscos:z.string().default('0')
    });
    console.log(req.body)

    const { diabetico,hipertenso,pacientesRiscos, title,totalPacients }=GeneratePDFBody.parse(req.body);
    const pdfService = new PdfService();
    const generatePdfUseCase = new GeneratePdfUseCase(pdfService);
    
    const pdfBuffer = await generatePdfUseCase.execute({ diabetico,hipertenso,pacientesRiscos,totalPacients, title });


    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('Falha na geração do PDF');
    }


    return res
      .header('Content-Type', 'application/pdf')
      .header('Content-Disposition', `inline; filename="${title}.pdf"`)
      .send(pdfBuffer); 

  } catch (err: any) {
    console.error('Erro ao gerar o PDF:', err);
    return res.status(500).send({
      message: 'Erro ao gerar o PDF',
      error: err.message,
    });
  }
}
