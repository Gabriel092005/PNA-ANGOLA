import { makeDeleMessage } from "@/use-cases/factories/make-delete-messages";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function DeleteMessages(req:FastifyRequest,reply:FastifyReply){

    const DeleteMessagesParamas = z.object({
        Id:z.string()
    })

    try { 
        const {Id} = DeleteMessagesParamas.parse(req.params)
        const usecase  = await  makeDeleMessage()
          usecase.execute({
            Id
          })
          return reply.status(204).send()

    } catch (error) {
        
    }

}