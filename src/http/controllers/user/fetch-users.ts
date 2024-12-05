
import { makeFetchUseCase } from "@/use-cases/factories/make-fetchUsersUsecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function Fetch(req:FastifyRequest,res:FastifyReply){

    const SearchanyBodySchema = z.object({
        page:z.string(),
        role:z.string().optional(),
        query:z.string().optional()
    })
    const {query,page,role} = SearchanyBodySchema.parse(req.query)
    console.log(query)
    const pageNumber = Number(page);
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).send({ message: "Invalid page number" });
    }
    try {
        const UseCase = makeFetchUseCase()

        const{Users} = await UseCase.execute({
            page:pageNumber,
            query:query,
            role:role
        })
        return res.status(200).send(Users)
    } catch (error) {
        return res.status(409).send({message:error})   
    }

}