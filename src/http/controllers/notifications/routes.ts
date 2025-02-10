import { FastifyInstance } from "fastify";
import { Fetchnotifications } from "./fetch-notifications";
import { deleteNotification } from "./delete-notification";

export async function NotifRoutes(app:FastifyInstance){

    app.get("/notif/:userId/:query=query?",Fetchnotifications)
    app.delete("/notif/delete/:Id",deleteNotification)

}