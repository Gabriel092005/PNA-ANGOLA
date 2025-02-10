import { makeFetchAllNotifications } from "@/use-cases/factories/make-fetch-all-notifications";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function Fetchnotifications(req:FastifyRequest,res:FastifyReply){
 

    try {
        const FetchShemaParams=z.object({
            userId:z.string()
         
        })
        const FetchShemaQuery=z.object({
            query:z.string().optional()
        })

        console.log(req.params)

        const { userId} = FetchShemaParams.parse(req.params)
        const {query} = FetchShemaQuery.parse(req.query)


        const usecase = await makeFetchAllNotifications()
        const {notification} = await usecase.execute({
            userId,
            query
        })
        return res.status(200).send({notification})
         
    } catch (error) {
        throw error
        
    }
}