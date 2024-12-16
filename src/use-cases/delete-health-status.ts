import { HealthRepository } from "@/repositories/prisma/prisma-health_status-repository";

interface DeleteHealthStatusRequest{
    Id:string
}

export class DeleteHealthUseCase {
    constructor(private healthRepository:HealthRepository){}
    async execute({Id}:DeleteHealthStatusRequest){
         this.healthRepository.deleteHealthStatus(Id)
    }
}