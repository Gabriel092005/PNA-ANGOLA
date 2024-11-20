import { UserAreadyExistsError } from "@/use-cases/erros/user-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-registerUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function Register(req:FastifyRequest,res:FastifyReply){


    const RegisterBodySchema = z.object({
        name : z.string(),
        email : z.string().email(),
        nip:z.string(),
        adress:z.string(),
        status:z.string(),
        phone:z.string(),
        born_at:z.string(),
        unit_name:z.string(),
        unit_adress:z.string(),
        image_path:z.string().nullable(),
      

    })
    const {image_path,status,name,adress,born_at,email,nip,phone,unit_adress,unit_name} = RegisterBodySchema.parse(req.body)


    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
             name,
             adress,
             born_at,
             email,
             nip,
             phone,
              status,
              unit_adress,
              unit_name,
             image_path
        })
    } catch (error:any) {
        if(error instanceof  UserAreadyExistsError){
            return res.status(409).send({message:error.message})
        }
        console.error(error)
        
    }

}