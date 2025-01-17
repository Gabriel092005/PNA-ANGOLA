import { FastifyInstance } from "fastify";
import { SendMsg } from "./send-messages";
import { FindAllMessage } from "./fetch-all-messages-admin";
import { GetMessagesAmount } from "./get-messages-amount";
import { OpenMessages } from "./open-messages";


export async function MessagesRoutes(app:FastifyInstance){
    app.post("/messages",SendMsg)
    app.get("/messages/find-all",FindAllMessage)
    app.get("/messages/amount/:userId",GetMessagesAmount)
    app.patch("/messages/open/:messageId=messageId & userId=userId",OpenMessages)
    // app.get('api/pdf')
}