import { makeFetchTechnician } from "@/use-cases/factories/make-fetchTechician";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function techician(req:FastifyRequest,res:FastifyReply){
    try {

        const FetchUserShemaParams=z.object({
            role:z.string()
        })

        const {role} = FetchUserShemaParams.parse(req.params)

        const usecase = makeFetchTechnician()
       const{user}= await usecase.execute({
            role
        })
        return res.status(200).send({user})
        
    } catch (error) {
        return res.status(409).send({message:'ups something went wrong'})
        
    }
    
}