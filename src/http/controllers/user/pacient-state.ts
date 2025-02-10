import { makePacientStateUseCase } from "@/use-cases/factories/make-PacientStateGraphics";
import { FastifyReply, FastifyRequest } from "fastify";


export async function GetPacientMetricsState(req:FastifyRequest,res:FastifyReply){
    try {
        const usecase = makePacientStateUseCase()
        const {metrics} = await  usecase.execute()
        return res.status(200).send({metrics})
        
    } catch (error) {
        console.error(error)
        
    }
}