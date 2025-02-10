import { makeDeleteNotif } from "@/use-cases/factories/make-delete-notif";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function deleteNotification(req:FastifyRequest, res:FastifyReply){
    const deleteNotificationParams  = z.object({
        Id:z.string()
    })
    const {Id} = deleteNotificationParams.parse(req.params)


    try {
          const usecase  = makeDeleteNotif()
          usecase.execute({
            Id
          })

          return res.status(204).send()
        
    } catch (error) {
        
    }
}