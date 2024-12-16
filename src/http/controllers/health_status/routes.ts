import { FastifyInstance } from "fastify";
import { save } from "./send-health-status";
import { Find } from "./find-health-status";
import { fetch } from "./fetch-health-status";
import { Delete } from "./delete";

export async function HealthRoutes(app:FastifyInstance){
    app.addHook
    app.post('/health/:userId',save)
    app.get('/fetch/:userId',fetch)
    app.get('/health/status/:userId',Find)
    app.delete('/health/delete/:Id=Id',Delete)
}