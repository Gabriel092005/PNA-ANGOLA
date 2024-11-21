import { FastifyInstance } from "fastify";
import { Register } from "./Register";
import { Authenticate } from "./Authenticate";
import { Fetch } from "./fetch-users";

export async function UserRoutes(app:FastifyInstance){
    
    app.post('/users',Register)
    app.post('/users/sessions',Authenticate)
    app.get('/users/fetch/:query',Fetch)
}