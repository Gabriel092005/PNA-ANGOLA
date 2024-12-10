
import { makeGetUserProfileCase } from "@/use-cases/factories/make-get-user-Profile";
import { FastifyRequest,FastifyReply } from "fastify";

export async function Profile(request:FastifyRequest,reply:FastifyReply) {


try {
    const getUserProfile = makeGetUserProfileCase()

    const {user}  = await getUserProfile.execute({
      userId : request.user.sub
    })
    console.log(request.user)
    console.log(request.headers) 
  
      
        return reply.status(200).send({
            user,
        })
} catch (error) {
    console.error(error)
    
}
   }




   



