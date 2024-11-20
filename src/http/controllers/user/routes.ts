import { FastifyInstance } from "fastify";
import { Register } from "./Register";

export async function UserRoutes(app:FastifyInstance){
    
    app.post('/users/:unitId',Register)
}