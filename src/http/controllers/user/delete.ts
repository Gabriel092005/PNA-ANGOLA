import { makeDeleteUser } from "@/use-cases/factories/make-delete-user";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Delete(req:FastifyRequest,res:FastifyReply){
    try {
        const deleteUserShemaParams=z.object({
            id:z.string().uuid()
        })
        const {id} = deleteUserShemaParams.parse(req.params)

        const usecase = makeDeleteUser()
        await usecase.execute({
            id
        })
        console.log(req.params)
        console.log('usuario deletado')
        return res.status(200).send({message:'user delete with succes'})
        
    } catch (error) {

        return res.status(409).send({message:'ups something went wrong'})
        
    }
    
}