import { UserAreadyExistsError } from "@/use-cases/erros/user-already-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-registerUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function Register(req:FastifyRequest,res:FastifyReply){
enum Role {
  ADMIN ='ADMIN' ,
  TECNICO='TECNICO',
  PACIENTE='PACIENTE'
}
enum GENDER{
    MASCULINO = 'MASCULINO',
    FEMENINO = 'FEMENINO'

}
enum CLASS {
    DIABETIC = 'DIABETICO',
    HYPERTENSIVE='HIPERTENSO'
    
}
enum STATUS {
    NORMAL='NORMAL',
    GOOD ='GOOD',
    BAD='BAD'
}
    const RegisterBodySchema = z.object({
        name : z.string(),
        email : z.string().email().optional(),
        nip:z.string(),
        province:z.string(),
        status:z.enum([STATUS.GOOD,STATUS.NORMAL,STATUS.BAD]).optional(),
        bi:z.string().optional(),
        phone:z.string(),
        born_at:z.string(),
        unit:z.string().optional(),
        municipality:z.string().optional(),
        patente:z.string().optional(),
        role:z.enum([Role.ADMIN,Role.PACIENTE,Role.TECNICO]),
        gender:z.enum([GENDER.FEMENINO,GENDER.MASCULINO]),
        classe:z.enum([CLASS.DIABETIC,CLASS.HYPERTENSIVE])  
    })
    const {status,name,born_at,email,nip,phone,patente,municipality,province,unit,bi,gender,role,classe} = RegisterBodySchema.parse(req.body)
    console.log(req.body)
    try {
        const registerUseCase = await  makeRegisterUseCase()
        const{User} = await registerUseCase.execute({
             name,
             born_at,
             email,
             nip,
             phone,
             classe,
             status,
             unit,
             bi,
             patente,
             municipality,
             province,
             image_path:undefined,
             gender:gender,
             role:role 
        })

 


        return res.status(201).send({User})
    } catch (error) {
        if(error instanceof  UserAreadyExistsError){
            return res.status(409).send({message:error.message})
        }
            console.error(error)
        
    }

}