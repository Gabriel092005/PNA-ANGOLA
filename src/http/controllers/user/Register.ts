import { UserAreadyExistsError } from "@/use-cases/erros/user-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-registerUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function Register(req:FastifyRequest,res:FastifyReply){


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
        distrit:z.string().optional(),
        image_path:z.string().nullable(),
      

    })
    const {image_path,status,name,born_at,email,nip,phone,distrit,municipality,province,unit,bi} = RegisterBodySchema.parse(req.body)


    try {
        const registerUseCase = makeRegisterUseCase()

       const{User} = await registerUseCase.execute({
             name,
             born_at,
             email,
             nip,
             phone,
              status,
              unit,
               bi,
               distrit,
               municipality,
             province,
             image_path
        })
        return res.status(201).send({User})
    } catch (error:any) {
        if(error instanceof  UserAreadyExistsError){
            return res.status(409).send({message:error.message})
        }
        console.error(error)
        
    }

}