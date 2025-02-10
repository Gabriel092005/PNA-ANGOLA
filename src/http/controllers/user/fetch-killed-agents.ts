
import { makeKilledAgent } from "@/use-cases/factories/make-killed-agent";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function FetchKilledAgent(req:FastifyRequest,res:FastifyReply){

    const FetchKilledAgentRequestBody = z.object({
        page:z.string().optional().default('1'),
        query:z.string().optional()
        
    })
    const{page,query} = FetchKilledAgentRequestBody.parse(req.query)
    console.log(req.query)
    try {
        const usecase = await makeKilledAgent()
        const {users,meta} = await usecase.execute({
            page,
            query
        })
        return res.status(200).send({users,meta})
        
    } catch (error) {
        throw error
   
        
    }
}