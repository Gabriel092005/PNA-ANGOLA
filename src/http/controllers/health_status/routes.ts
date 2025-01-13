import { FastifyInstance } from "fastify";
import { save } from "./send-health-status";
import { Find } from "./find-health-status";
import { fetch } from "./fetch-health-status";
import { Delete } from "./delete";
import { Graphics } from "./graphics";

export async function HealthRoutes(app:FastifyInstance){
                        
    app.post('/health/:userId',save)
    app.get('/fetch/:userId',fetch)
    app.get('/health/status/:userId',Find)
    app.get('/graphics',Graphics)
    app.delete('/health/delete/:Id=Id',Delete)
}