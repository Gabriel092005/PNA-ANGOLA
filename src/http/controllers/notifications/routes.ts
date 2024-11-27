import { FastifyInstance } from "fastify";
import { Fetchnotifications } from "./fetch-notifications";

export async function NotifRoutes(app:FastifyInstance){

    app.get("/notif/:id",Fetchnotifications)

}