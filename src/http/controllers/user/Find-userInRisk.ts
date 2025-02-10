import { makeFindPacientBaseState } from "@/use-cases/factories/make-FindPacientBadState";
import { FastifyReply, FastifyRequest } from "fastify";


export async function findUserInRisk(req:FastifyRequest,reply:FastifyReply){
      try {
           const pacientsAmount = makeFindPacientBaseState()
           const usecase  = await pacientsAmount.execute()
           const  PacientsInRiskAmount  =  usecase.PacientsInRiskAmount
           return reply.status(200).send({PacientsInRiskAmount})


      } catch (error) {
        
      }
}