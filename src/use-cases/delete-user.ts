import { usersRepository } from "@/repositories/prisma/prisma-users-repository";

interface DeleteUserUseCaseRequest{
    id:string
}

export class DeleteUserUseCase{
    constructor (private usersRepository:usersRepository){}
    async execute({id}:DeleteUserUseCaseRequest):Promise<null>{
           await this.usersRepository.remove(id)
           return null
    }
}