import { FastifyInstance } from "fastify";
import { save } from "./send-health-status";
import { Find } from "./find-health-status";
import { fetch } from "./fetch-health-status";

export async function HealthRoutes(app:FastifyInstance){
    app.addHook
    app.post('/health/:userId',save)
    app.get('/fetch/:userId',fetch)
    app.get('/health/status/:userId',Find)
}