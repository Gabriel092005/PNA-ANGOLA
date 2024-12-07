import { usersRepository } from "@/repositories/prisma/prisma-users-repository";


export class totalCountUseCase {
    constructor(private usersRepository:usersRepository){}
    async execute(){
        const totalCount = this.usersRepository.findTotalPacientCount()
        return{
            totalCount
        }
    }
}