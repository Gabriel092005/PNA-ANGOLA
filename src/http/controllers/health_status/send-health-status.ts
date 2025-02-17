import { makeSendHealthStatus } from "@/use-cases/factories/make-send-health-status";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function save(req:FastifyRequest, res:FastifyReply){
   const SendHealthStatusParamasSchema = z.object({
      userId:z.string()
   })
     const SendHealthStatusBodySchema = z.object({
        blood_glucose :z.number(),
        cholesterol :z.number(),
        weigth:z.number(),
        triglycerides  :z.number(),
        sistolic:z.number(),
        diastolic:z.number(),

     })
     try {
         const {diastolic,sistolic,blood_glucose,cholesterol,weigth,triglycerides} = SendHealthStatusBodySchema.parse(req.body)
         const {userId} = SendHealthStatusParamasSchema.parse(req.params)
         const usecase =  makeSendHealthStatus()
           console.log(req.body)
         const {health_status} = await usecase.execute({
            
            blood_glucose,
            diastolic:Number(diastolic),
            sistolic:Number(sistolic),
            userId,
            cholesterol,
            weigth,
            triglycerides  

         })
         return res.status(201).send({health_status})
     } catch (error) {
         console.error(error)
        throw error
        
     }
}