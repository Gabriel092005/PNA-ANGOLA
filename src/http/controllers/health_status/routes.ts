import { FastifyInstance } from "fastify";
import { save } from "./send-health-status";





export async function HealthRoutes(app:FastifyInstance){
    
    app.post('/health/:userId',save)
 

}