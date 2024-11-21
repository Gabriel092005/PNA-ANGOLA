
import { makeFetchUseCase } from "@/use-cases/factories/make-fetchUsersUsecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function Fetch(req:FastifyRequest,res:FastifyReply){

    const RegisterBodySchema = z.object({
        query:z.string()
    })
    const {query} = RegisterBodySchema.parse(req.params)
    console.log(query)
    try {
        const UseCase = makeFetchUseCase()

        const{Users} = await UseCase.execute({
            // page,
            query
        })
        return res.status(200).send(Users)
    } catch (error) {
        return res.status(409).send({message:error})   
    }

}