import { makeGetMessagesDoctor } from "@/use-cases/factories/make-GetMessages";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function GetDoctorMessages(req:FastifyRequest,reply:FastifyReply){
      
    try{
        const GetDoctorMessagesSchema = z.object({
            Id:z.string()
        })
        
        const {Id} =  GetDoctorMessagesSchema.parse(req.params)
        const usecase = await makeGetMessagesDoctor()
        const {messages} = await usecase.execute({
            Id
        })
        
        console.log("msg")
        return reply.status(200).send(messages)

    }catch(err:any){

    }

}