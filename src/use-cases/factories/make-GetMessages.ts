import { PrismaMessagesRepository } from "@/repositories/message-repository";
import { GetDoctorMessagesUseCase } from "../get-doctor-messages";

export async function makeGetMessagesDoctor(){
    const messagesRepository = new PrismaMessagesRepository()
    const usecase  = new GetDoctorMessagesUseCase(messagesRepository)
    return usecase

}