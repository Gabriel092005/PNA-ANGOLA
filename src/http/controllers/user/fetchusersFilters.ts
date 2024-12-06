import { makeFetchUsersByProvince } from "@/use-cases/factories/make-fetch-users-byprovince";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchby(req:FastifyRequest,res:FastifyReply){
    try{
        const  fetchbyProvinceQuery = z.object({
            province:z.string().optional(),
            municipality:z.string().optional(),
            nip:z.string().optional(),
            unidade:z.string().optional(),
            page:z.string().optional().default('1')
        })
        
        const {municipality,nip,province,unidade,page}=fetchbyProvinceQuery.parse(req.query)

            //  console.log(nip)
    
        const usecase = makeFetchUsersByProvince()
        const {user} = await usecase.execute({

             municipality,nip,province,unidade,page
             
        }) 
        return res.status(200).send({user})

    }catch{

    }
}   