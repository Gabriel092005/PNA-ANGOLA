import { makeSendHealthStatus } from "@/use-cases/factories/make-send-health-status";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function save(req:FastifyRequest, res:FastifyReply){
   const SendHealthStatusParamasSchema = z.object({
      userId:z.string()
   })
     const SendHealthStatusBodySchema = z.object({
        blood_pressure:z.number(),
        blood_glucose :z.number(),
        cholesterol :z.number(),
        weigth:z.number(),
        triglycerides  :z.number()

     })
     try {
         const {blood_pressure,blood_glucose,cholesterol,weigth,triglycerides} = SendHealthStatusBodySchema.parse(req.body)
         const {userId} = SendHealthStatusParamasSchema.parse(req.params)
         const usecase =  makeSendHealthStatus()
         const {health_status} = await usecase.execute({
            
            blood_glucose,
            blood_pressure,
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