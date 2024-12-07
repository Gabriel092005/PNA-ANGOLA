import { makeFetchUsersByProvince } from "@/use-cases/factories/make-fetch-users-byprovince";
import { makeTotalCountPacient } from "@/use-cases/factories/make-total-count";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchby(req:FastifyRequest,res:FastifyReply){
    try{
   
        const  fetchbyProvinceQuery = z.object({
            province:z.string().optional(),
            municipality:z.string().optional(),
            nip:z.string().optional(),
            unidade:z.string().optional(),
            page:z.string().optional()
        })
        
        const {municipality,nip,province,unidade,page}=fetchbyProvinceQuery.parse(req.query)
        if(!page){
            return
        }
        parseInt(page)

        const usecase = makeFetchUsersByProvince()
        const totalCount = makeTotalCountPacient()
        const UseCase = await totalCount.execute()
        const TotalPacient = await UseCase.totalCount


        const {user} = await usecase.execute({

             municipality,nip,province,unidade,page
             
        }) 
        return res.status(200).send({user,meta:[
           {
            totalCount:TotalPacient,
            perPage:10
           }
        ]})

    }catch{

    }
}   