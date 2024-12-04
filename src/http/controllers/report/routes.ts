import { FastifyInstance } from "fastify";
import { Generate } from "./ReportController";



export async function GeneratePDFRoutes(app:FastifyInstance){

    app.post('/generate-pdf',Generate)
}