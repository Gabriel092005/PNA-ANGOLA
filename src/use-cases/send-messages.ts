import { MessagesRepository } from "@/repositories/prisma/prisma-messages.repository";
import { messages } from "@prisma/client";
import { resourceNotFoundError } from "./erros/resource-not-found-errors";
import { usersRepository } from "@/repositories/prisma/prisma-users-repository";
import { NotificationsRepository } from "@/repositories/prisma/prisma-notifications-repository";

interface SendMessageUseCaseRequest{
  content: string;
  senderId: string;
  subject:string
  receiverId: string; 
}

interface SendMessageUseCaseResponse {
  message: messages; 
  messageContext:string
}

export class SendMessageUseCase {
  constructor(
    private messagesRepository: MessagesRepository,
    private usersRepository:usersRepository,
    private notificationsRepository:NotificationsRepository
) {}
  

  async execute({
    content,
    senderId,
    receiverId,
    subject
  }: SendMessageUseCaseRequest): Promise<SendMessageUseCaseResponse> {

    const SenderId = await this.usersRepository.findById(senderId)
    const ReceiverId = await this.usersRepository.findById(receiverId)
    
    const userdata =  SenderId
    if(!receiverId){
      throw new resourceNotFoundError()
    }
    const name = userdata?.name
        const  messageContext = ` O  ${name} enviou-te uma mensagem`
        await this.notificationsRepository.GenerateNotification(receiverId,name,messageContext)
    if(!SenderId || !ReceiverId){
        throw new resourceNotFoundError()
    }
    if (!senderId) {
      throw new resourceNotFoundError();
    }
    if (!receiverId) {
      throw new resourceNotFoundError();
    }
    const message = await this.messagesRepository.sendMessage(
      content,
      receiverId,
      senderId,
      subject
    );

    return {
      messageContext,
      message, 
    };
  }
}
