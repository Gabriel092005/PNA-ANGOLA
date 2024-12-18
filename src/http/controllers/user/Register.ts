import { UserAreadyExistsError } from "@/use-cases/erros/user-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-registerUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function Register(req:FastifyRequest,res:FastifyReply){
    console.log(req.body)
    const RegisterBodySchema = z.object({
        name : z.string(),
        email : z.string().email().optional(),
        nip:z.string(),
        province:z.string(),
        status:z.string().optional(),
        bi:z.string().optional(),
        phone:z.string(),
        born_at:z.string(),
        unit:z.string().optional(),
        municipality:z.string().optional(),
        patente:z.string().optional(),
   
      

    })
    const {status,name,born_at,email,nip,phone,patente,municipality,province,unit,bi} = RegisterBodySchema.parse(req.body)
         

    try {
        const registerUseCase =  makeRegisterUseCase()


        const{User} = await registerUseCase.execute({
             name,
             born_at,
             email,
             nip,
             phone,
              status,
              unit,
               bi,
               patente,
               municipality,
             province,
             image_path:undefined
            
        })
        return res.status(201).send({User})
    } catch (error) {
        if(error instanceof  UserAreadyExistsError){
            return res.status(409).send({message:error.message})
        }
            console.error(error)
        
    }

}