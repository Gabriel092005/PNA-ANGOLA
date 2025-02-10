
import { makeFetchMessagesDoctor } from "@/use-cases/factories/make-find-doctor-messages";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function FindAllMessageDoctor(req:FastifyRequest, res:FastifyReply){
    try {
        const FindAllMessageParamSchema  = z.object({
            userId:z.string().uuid()
        })
        const  {userId} = FindAllMessageParamSchema.parse(req.params)
        
         const usecase = await makeFetchMessagesDoctor()
         const {messages } =  await usecase.execute({userId})

         return res.status(200).send({messages})

    } catch (error) {
        return res.status(409).send({message:'message failed'})
        throw error
        
    }

}