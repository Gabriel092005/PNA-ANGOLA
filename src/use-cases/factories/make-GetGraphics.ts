import { PrismaHealthRepository } from "@/repositories/health_status_repositoy";
import { GetGraphicsDataUseCase } from "../get-graphics-statistics";

export function makeGetGraphics(){
    const Health_Repository = new PrismaHealthRepository()
    const UseCase = new GetGraphicsDataUseCase(Health_Repository)
    return  UseCase
}