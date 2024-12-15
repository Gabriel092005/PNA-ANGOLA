import { fastify } from 'fastify';
import fastifycookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import { ZodError } from 'zod';
import { env } from './Env';
import cors from '@fastify/cors';
import { UserRoutes } from './http/controllers/user/routes';
import fastifyCompress from '@fastify/compress';
import { HealthRoutes } from './http/controllers/health_status/routes';
import { MessagesRoutes } from './http/controllers/messages/routes';
import { NotifRoutes } from './http/controllers/notifications/routes';
import { GeneratePDFRoutes } from './http/controllers/report/routes';

export const app = fastify();
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '1d',
  },
});

app.register(cors,{
    origin:'https://pna-frontend-last.onrender.com',
    credentials:true
})

// Registro de plugins e rotas
app.register(fastifycookie);
app.register(fastifyCompress, { global: true });
app.register(UserRoutes);
app.register(HealthRoutes);
app.register(MessagesRoutes);
app.register(NotifRoutes);
app.register(GeneratePDFRoutes);


app.setErrorHandler((err, request, reply) => {
  if (err instanceof ZodError) {
    return reply.status(400).send({
      message: 'validation error',
      issues: err.format(),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err); // Logar o erro detalhado no ambiente de desenvolvimento
  }

  return reply.status(500).send({ message: 'internal server error' });
});
