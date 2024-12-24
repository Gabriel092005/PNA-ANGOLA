import { makeFetchDataBy } from "@/use-cases/factories/make-fetchDataBy-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function FetchDataBy(req:FastifyRequest,reply:FastifyReply){

     console.log('dados:',req.query)

     const FetchDataBySchemaQuery = z.object({
        date:z.string().optional(),
        province:z.string().optional(),
        municipality:z.string().optional(),
        unidade:z.string().optional(),
        gender:z.string().optional()
     })
    try {
        const {date,gender,municipality,province} = FetchDataBySchemaQuery.parse(req.query)
        const usecase = makeFetchDataBy()
        const {Metrics} = await usecase.execute({
            date,gender:gender,municipality:municipality,province:province
        })
        return reply.status(200).send({Metrics})
    } catch (error) {
        
    }

}