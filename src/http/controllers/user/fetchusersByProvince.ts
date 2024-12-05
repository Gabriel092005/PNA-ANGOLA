import { makeFetchUsersByProvince } from "@/use-cases/factories/make-fetch-users-byprovince";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchbyProvince(req:FastifyRequest,res:FastifyReply){
    try{
        const  fetchbyProvinceQuery = z.object({
            query:z.string()
        })
        const {query} = fetchbyProvinceQuery.parse(req.query)
        console.log(query)

        const usecase = makeFetchUsersByProvince()
        const {user} = await usecase.execute({
            query
        })
        console.log(user)
        return res.status(200).send({user})

    }catch{

    }
}   