import { MessagesRepository } from "@/repositories/prisma/prisma-messages.repository";

interface GetMessagesAmountRequest {
    userId: string;
}
interface GetMessagesAmountResponse {
    amount: number;
}

export class GetMessagesAmountUseCase {
    constructor(private messagesRepository: MessagesRepository) {}

    async execute({ userId }: GetMessagesAmountRequest): Promise<GetMessagesAmountResponse> {

        const amount = await this.messagesRepository.MessagesAmount(userId);

        return {
            amount,
        };
    }
}
