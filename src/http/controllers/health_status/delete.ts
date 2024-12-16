import { makeDeleteHealth } from "@/use-cases/factories/make-delete-health";
import { FastifyReply, FastifyRequest } from "fastify";
import { useSearchParams } from "next/navigation";
import { z } from "zod";

export async function Delete(req:FastifyRequest,res:FastifyReply){
    const DeleteUseCaseParamsSchema = z.object({
        Id:z.string()
    })
      try {
        const {Id} = DeleteUseCaseParamsSchema.parse(req.query)
              const usecase = makeDeleteHealth()
              usecase.execute({
                Id
            })
            
              return res.status(200).send({message:'Estado deletado com sucesso'})
      } catch (error) {
            
           console.error(error)
           return error
      }

}