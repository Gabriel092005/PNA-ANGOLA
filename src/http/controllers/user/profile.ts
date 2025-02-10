
import { makeGetUserProfileCase } from "@/use-cases/factories/make-get-user-Profile";
import { FastifyRequest,FastifyReply } from "fastify";
import { z } from "zod";

export async function Profile(request:FastifyRequest,reply:FastifyReply) {

try {

    const getUserProfile = makeGetUserProfileCase()

    const { user }  = await getUserProfile.execute({
        userId:request.user.sub
    })      
        return reply.status(200).send({
            user,
        })
} catch (error:any) {
    console.error(error)
    
}
   }




   



