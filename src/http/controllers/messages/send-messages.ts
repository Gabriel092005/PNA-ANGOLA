import { resourceNotFoundError } from "@/use-cases/erros/resource-not-found-errors";
import { makeSendMessage } from "@/use-cases/factories/make-send-message";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function SendMsg(req:FastifyRequest,res:FastifyReply){
    
    console.log(req.body)
    const sendMessageBodySchema = z.object({
        senderId:z.string(),
        receiverId:z.string(),
        subject:z.string(),
        content:z.string()
    })
    try {
        const {content,receiverId,senderId,subject} = sendMessageBodySchema.parse(req.body)
        

        const usecase = makeSendMessage()
        const {message} = await usecase.execute({
            content,
            receiverId,
            senderId,
            subject
        })
        return res.status(200).send({message})
    } catch (error) {
        if(error instanceof resourceNotFoundError){
            throw new resourceNotFoundError()
        }

        console.error(error)
        throw error

        
    }
}