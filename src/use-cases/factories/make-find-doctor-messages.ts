import { PrismaMessagesRepository } from "@/repositories/message-repository";
import { fetchDoctorMessagesUseCase } from "../fetch-doctor-messages";

export async function makeFetchMessagesDoctor(){
    const messagesRepository = new PrismaMessagesRepository()
    const usecase  = new fetchDoctorMessagesUseCase(messagesRepository)
    return usecase

}