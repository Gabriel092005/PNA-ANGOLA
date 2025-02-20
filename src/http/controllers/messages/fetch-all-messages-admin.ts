import { makeFetchMessages } from "@/use-cases/factories/make-fetch-messages";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";



export async function FindAllMessage(req:FastifyRequest, res:FastifyReply){
    const getMessagesRequestParams  = z.object({
        query:z.string().optional()
     })

     const {query} = getMessagesRequestParams.parse(req.query)

     console.log(query)

    try {
         const usecase = makeFetchMessages()
         const { messages } = await usecase.execute({
            query
         })
      
         return res.status(200).send({messages})

    } catch (error) {
        // return res.status(409).send({message:'message failed'})
        throw error
        
    }

}