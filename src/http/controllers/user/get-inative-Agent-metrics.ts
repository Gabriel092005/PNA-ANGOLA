import { makeInativeAgenteMetrics } from "@/use-cases/factories/make-inative-agente";
import { makePacientMetrics } from "@/use-cases/factories/make-pacient-metrics";
import { FastifyReply, FastifyRequest } from "fastify";


export async function GetPacientInativeMetrics(req:FastifyRequest,res:FastifyReply){
    try {
        const usecase = makeInativeAgenteMetrics()
        const {IsAliveAgent} = await usecase.execute()
        return res.status(200).send({IsAliveAgent})
        
    } catch (error) {
        console.error(error)
        
    }
}