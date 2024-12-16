import { MessagesRepository } from "@/repositories/prisma/prisma-messages.repository";
import { messages } from "@prisma/client";
import { resourceNotFoundError } from "./erros/resource-not-found-errors";
import { usersRepository } from "@/repositories/prisma/prisma-users-repository";
import { NotificationsRepository } from "@/repositories/prisma/prisma-notifications-repository";

interface SendMessageUseCaseRequest {
  content: string;
  senderId: string;
  receiverId: string; 
}

interface SendMessageUseCaseResponse {
  message: messages; // Ajustado para singular para representar uma única mensagem
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
  }: SendMessageUseCaseRequest): Promise<SendMessageUseCaseResponse> {

    const SenderId = this.usersRepository.findById(senderId)
    const ReceiverId = this.usersRepository.findById(receiverId)

        const data = await SenderId
        if(!data){
           throw new resourceNotFoundError()
        }
        const name = data.name
        const  messageContext = ` O  ${name} enviou-te uma mensagem`
      this.notificationsRepository.GenerateNotification(receiverId)

    if(!SenderId || !ReceiverId){
        throw new resourceNotFoundError()
    }
    if (!senderId) {
      throw new resourceNotFoundError();
    }
    if (!receiverId) {
      throw new resourceNotFoundError();
    }
  console.log(messageContext)


    const message = await this.messagesRepository.sendMessage(
      content,
      receiverId,
      senderId
    );

    return {
      messageContext,
      message, 
    };
  }
}
