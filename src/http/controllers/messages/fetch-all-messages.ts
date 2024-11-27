import { makeFetchMessages } from "@/use-cases/factories/make-fetch-messages";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function FindAllMessage(req:FastifyRequest, res:FastifyReply){

    const messagesSchemaParamas = z.object({
       userId:z.string() 
    })

    try {
         const {userId} = messagesSchemaParamas.parse(req.params)
         const usecase = makeFetchMessages()

         const {messages} = await usecase.execute({
            userId
         })
         return res.status(200).send({messages})
    } catch (error) {
        return res.status(409).send({message:'message failed'})
        
    }

}