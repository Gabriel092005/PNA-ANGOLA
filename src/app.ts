import { fastify } from "fastify";
import fastifycookie from "@fastify/cookie";
import { ZodError } from "zod";
import { error } from "console";
import { env } from "./Env";
import fastifyJwt from "@fastify/jwt";
import { UserRoutes } from "./http/controllers/user/routes";
import { HealthRoutes } from "./http/controllers/health_status/routes";
import { MessagesRoutes } from "./http/controllers/messages/routes";
import { NotifRoutes } from "./http/controllers/notifications/routes";



export const app = fastify()
app.register(fastifyJwt,{
    secret : env.JWT_SECRET,
    cookie:{
        cookieName:'refreshToken',
        signed:false,
    },
    sign:{
        expiresIn : '10m'
    },

    
}) 

app.register(fastifycookie)
app.register(UserRoutes)
app.register(HealthRoutes)
app.register(MessagesRoutes)
app.register(NotifRoutes)


app.setErrorHandler((Error,request,reply)=>{

    if(Error instanceof ZodError){

        return reply.status(400)
        .send( {
            message : 'validation error' , 
            issues:Error.format()
        })
    }
    
    if(env.NODE_ENV!=='production'){
        console.error(error)
        
    }

    return reply
  
    .status(500)
    .send(
        {message : 'internal server error'}
    ) 
})