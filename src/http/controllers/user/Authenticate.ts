import { z } from 'zod';
import { FastifyRequest, FastifyReply } from "fastify";
import { invalidCredentialsError } from '@/use-cases/erros/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticateUseCase';


export async function Authenticate(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

    const AuthenticateBodySchema = z.object({
        nip:z.string(),
        name:z.string()
    });

    const {name,nip } = AuthenticateBodySchema.parse(request.body);
    console.log(request.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        
        const { user } = await authenticateUseCase.execute({
         name,
         nip
        });
        const token = await reply.jwtSign(
            { role: user.role },
            { sign: { sub:user.id } }
        );
        

        const refreshToken = await reply.jwtSign(
            { role: user.role },
            { sign: {sub: user.id, expiresIn: '7d' } }
        );
        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                httpOnly: true
            })
            .status(200)
            .send({ token });

    } catch (error) {
   
        if (error instanceof invalidCredentialsError) {
            return reply.status(400).send({ message: error.message });
        }
        throw error;
    }
}
