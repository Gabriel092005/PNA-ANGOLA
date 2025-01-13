import { z } from 'zod';
import { FastifyRequest, FastifyReply } from "fastify";
import { invalidCredentialsError } from '@/use-cases/erros/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticateUseCase';


export async function Authenticate(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

    const AuthenticateBodySchema = z.object({
        nip:z.string(),
        bi:z.string().optional()
    });
    const {bi,nip } = AuthenticateBodySchema.parse(request.body);
    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        const { user } = await authenticateUseCase.execute({
         bi,
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
                httpOnly: true,
                sameSite:'none'
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
