import { resourceNotFoundError } from "@/use-cases/erros/resource-not-found-errors";
import { makeSendMessage } from "@/use-cases/factories/make-send-message";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function SendMsg(req:FastifyRequest,res:FastifyReply){
    console.log('entrei')
    const sendMessageQuerySchema = z.object({
        senderId:z.string(),
        receiverId:z.string()
    })
    const sendMessageBodySchema = z.object({
        content:z.string()
    })
    try {
        const {content} = sendMessageBodySchema.parse(req.body)
        const {receiverId,senderId} = sendMessageQuerySchema.parse(req.query)

        console.log(req.query)

        const usecase = makeSendMessage()
        const {message} = await usecase.execute({
            content,
            receiverId,
            senderId
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