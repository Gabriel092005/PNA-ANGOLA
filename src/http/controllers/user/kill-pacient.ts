import { makeKillPacient } from "@/use-cases/factories/make-kill-pacient";
import { makePacientStateUseCase } from "@/use-cases/factories/make-PacientStateGraphics";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function KillPacient(req:FastifyRequest,res:FastifyReply){
    const killPacientSchemaParams = z.object({
        userId:z.string()
    })
    try {
         const {userId} = killPacientSchemaParams.parse(req.params)
         console.log('cheguei',req.params)
        const usecase =  makeKillPacient()
         await  usecase.execute({
             userId:userId
         })
        return res.status(204).send()
        
    } catch (error) {
        console.error(error)
        
    }
}