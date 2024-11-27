import { makeGetMessagesAmount } from "@/use-cases/factories/make-get-messages";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function GetMessagesAmount(req:FastifyRequest, res:FastifyReply){
    const GetMessagesSchema = z.object({
        userId:z.string()
    })
    try {
        const {userId} = GetMessagesSchema.parse(req.params)

        const usecase = await makeGetMessagesAmount()
        const {amount} =await usecase.execute({
            userId
        })      
        return res.status(200).send({MessagesQuantity:amount})  
    } catch (error) {
        
    }
}