import { makeOpenMessages } from "@/use-cases/factories/make-open-messages";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function OpenMessages(req:FastifyRequest,res:FastifyReply){
    const OpenMessagesSchemaQuery = z.object({
        userId:z.string(),
        messageId:z.string()
    })
    try {
         const {messageId,userId} = OpenMessagesSchemaQuery.parse(req.query)
         const usecase = makeOpenMessages()

         const {message} = await usecase.execute({
            messageId,
            userId
         })

      return res.status(200).send({message})
    } catch (error){

        throw error
        
    }
}