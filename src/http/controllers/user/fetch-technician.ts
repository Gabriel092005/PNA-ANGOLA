import { makeFetchTechnician } from "@/use-cases/factories/make-fetchTechician";
import { FastifyReply, FastifyRequest } from "fastify";
import { page } from "pdfkit";
import { z } from "zod";

export async function techician(req:FastifyRequest,res:FastifyReply){

    console.log(req.query)

    try {
        const FetchUserShemaParams=z.object({
            municipality:z.string().optional(),
            unidade:z.string().optional(),
            province:z.string().optional(),
            page:z.string().optional()
       })


      
        const { municipality,province,unidade,page} = FetchUserShemaParams.parse(req.query)

        
        const usecase = makeFetchTechnician()

       const{ user,meta } = await usecase.execute({ municipality:municipality,province:province,unidade:unidade,page:page})

        return res.status(200).send({user,meta})
        
    } catch (error) {
        throw error
        return res.status(409).send({message:'ups something went wrong'})
        
    }
    
}