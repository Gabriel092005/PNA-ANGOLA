import { makeGetUserHealthStatus } from "@/use-cases/factories/make-get-user-healthstatus";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Find(req:FastifyRequest,res:FastifyReply){
    const FindHealthStatusParams = z.   object({
        userId:z.string().uuid()
    })
    try{
        const {userId} = FindHealthStatusParams.parse(req.params)
        const usecase = makeGetUserHealthStatus()

        const  {health_status} = await usecase.execute({
            userId
        })
        health_status.map((health_status)=>{
            return res.status(200).send(
           {  health_status}
            )
        })
    
    }catch{

    }
}