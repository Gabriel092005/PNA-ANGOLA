import { makeLogOut } from "@/use-cases/factories/make-log-out";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function LogOut(req:FastifyRequest, res:FastifyReply){
    try {
        const LogOutUseCaseParamsSchema = z.object({
            userId:z.string()
        })
        const {userId} = LogOutUseCaseParamsSchema.parse(req.params)

        const usecase = await makeLogOut()
        usecase.execute({
            userId
        })
        return res.status(201).send({message:'saiu com sucesso'})

    } catch (error) {
        console.error(error)
        return error
    }

}