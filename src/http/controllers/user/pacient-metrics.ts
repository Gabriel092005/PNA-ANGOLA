import { makePacientMetrics } from "@/use-cases/factories/make-pacient-metrics";
import { FastifyReply, FastifyRequest } from "fastify";


export async function GetPacientMetrics(req:FastifyRequest,res:FastifyReply){
    try {

        const usecase = makePacientMetrics()
        const {metrics} = await usecase.execute()
        return res.status(200).send({metrics})
        
    } catch (error) {
        
    }
}