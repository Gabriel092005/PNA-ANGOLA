import { makeGetGraphics } from "@/use-cases/factories/make-GetGraphics";
import { FastifyReply, FastifyRequest } from "fastify";


export async function Graphics(req:FastifyRequest,res:FastifyReply){
    try{
        const usecase = makeGetGraphics()
        const  {data} = await usecase.execute()

        return res.status(200).send(data)
    
    }catch{

    }
}