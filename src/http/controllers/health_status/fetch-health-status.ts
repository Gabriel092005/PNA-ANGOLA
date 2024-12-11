import { makeFetchUserHealthStatus } from "@/use-cases/factories/make-fetch-user-healthstatus";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetch(req:FastifyRequest,res:FastifyReply){
     const fetchHealthStatusParams = z.object({
        userId:z.string().uuid()
     })
     try {
        const {userId}=fetchHealthStatusParams.parse(req.params) 
          const usecase = await  makeFetchUserHealthStatus()
          const  {healthStatus} = await usecase.execute({
            userId
          })
          return res.send({healthStatus})
     } catch (error) {
        
     }
}