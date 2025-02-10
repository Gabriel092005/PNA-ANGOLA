import { FastifyInstance } from "fastify";
import { SendMsg } from "./send-messages";
import { FindAllMessage } from "./fetch-all-messages-admin";
import { GetMessagesAmount } from "./get-messages-amount";
import { OpenMessages } from "./open-messages";
import { FindAllMessageDoctor } from "./fetch-admin-messages";
import { GetDoctorMessages } from "./Get-Doctor-Message";
import { DeleteMessages } from "./delete-messages";


export async function MessagesRoutes(app:FastifyInstance){
    app.post("/messages",SendMsg)
    app.get("/messages/find-all/:query=query?",FindAllMessage)
    app.post("/messages/get-messages/:Id",GetDoctorMessages)
    app.get("/messages/amount/:userId",GetMessagesAmount)
    app.delete('/messages/delete/:Id',DeleteMessages)
    app.get("/messages/find-all-doctor/:userId",FindAllMessageDoctor)
    app.patch("/messages/open/:messageId=messageId & userId=userId",OpenMessages)
    // app.get('api/pdf')
}