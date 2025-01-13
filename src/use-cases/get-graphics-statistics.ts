import { HealthRepository } from "@/repositories/prisma/prisma-health_status-repository";

interface GetGraphicsDataResponse {
    data: {
        province: string;
        // totalPacientes: number;
        // diabeticos: number;
        Percentage: number;
    }[];
}

export class GetGraphicsDataUseCase {
    constructor(private healthRepository: HealthRepository) {}

    async execute(): Promise<GetGraphicsDataResponse> {
        // Recupera os dados de total de pacientes e pacientes com diabetes
        const totalPacientsPerProvince = await this.healthRepository.totalPacientsPerProvince();
        const PacientsWithDiabetics = await this.healthRepository.PacientsWithDiabetics();

        console.log(PacientsWithDiabetics);
        console.log(totalPacientsPerProvince);

        // Mapeia os dados para a resposta esperada
        const data = totalPacientsPerProvince.map((item) => {
            // Busca os pacientes com diabetes para a província atual
            const diabeticos = PacientsWithDiabetics.find(
                (diabe) => diabe.province === item.province
            );
            const diabeticsCount = diabeticos ? diabeticos._count.id : 0;

            // Calcula o percentual de pacientes com diabetes
            const Percentage = item._count.id > 0
                ? ((diabeticsCount / item._count.id) * 100).toFixed(2)
                : '0.00';

            return {
                province: item.province,
                // totalPacientes: item._count.id,
                // diabeticos: diabeticsCount,
                Percentage: parseFloat(Percentage) // Garantir que o percentual seja um número
            };
        });
        // console.log(resultado);

        return {
          data
        };
    }
}
