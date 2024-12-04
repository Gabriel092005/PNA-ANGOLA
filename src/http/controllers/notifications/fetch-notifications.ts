import { makeFetchAllNotifications } from "@/use-cases/factories/make-fetch-all-notifications";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function Fetchnotifications(req:FastifyRequest,res:FastifyReply){
 

    try {
        const FetchShemaParams=z.object({
            userId:z.string()
        })

        console.log(req.params)

        const { userId } = FetchShemaParams.parse(req.params)


        const usecase = await makeFetchAllNotifications()
        const {notification} = await usecase.execute({
            userId
        })
        return res.status(200).send({notification})
         
    } catch (error) {
        throw error
        
    }
}