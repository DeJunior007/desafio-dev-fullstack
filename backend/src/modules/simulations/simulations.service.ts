import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaLeadRepository } from './repositories/prisma-lead.repository';
import { MagicPdfService } from '../../shared/magic-pdf/magic-pdf.service';
import { MagicPdfMapper } from '../../shared/magic-pdf/mapper/magic-pdf.mapper';

@Injectable()
export class SimulationsService {
  constructor(
    private readonly repository: PrismaLeadRepository,
    private readonly magicPdfService: MagicPdfService,
  ) {}

  /**
   * REGISTRAR NOVA SIMULAÇÃO (CREATE)
   * Integração com MagicPDF, Mapeamento de Domínio e Persistência.
   */
  async create(file: Express.Multer.File, body: { nomeCompleto: string; email: string; telefone: string }) {
    if (!file) {
      throw new BadRequestException('Arquivo de fatura é obrigatório.');
    }

    // 1. Decodifica a fatura usando o serviço externo
    const rawData = await this.magicPdfService.decodeBill(file);

    if (!rawData || !rawData.invoice) {
      throw new BadRequestException('Falha ao extrair dados válidos da fatura.');
    }

    // 2. Utiliza o Mapper para traduzir os dados da API para o nosso domínio
    // O Mapper já cuida do .slice(0, 12) para a regra de negócio
    const domainData = MagicPdfMapper.toDomain(rawData);

    // 3. Prepara a estrutura para o Prisma (Nested Write)
    const leadData = {
      nomeCompleto: body.nomeCompleto,
      email: body.email,
      telefone: body.telefone,
      unidades: {
        create: [
          {
            codigoDaUnidadeConsumidora: domainData.codigoDaUnidadeConsumidora,
            modeloFasico: domainData.modeloFasico,
            enquadramento: domainData.enquadramento,
            historicoDeConsumoEmKWH: {
              create: domainData.historicoDeConsumoEmKWH,
            },
          },
        ],
      },
    };

    try {
      return await this.repository.create(leadData);
    } catch (error) {
      // Erro P2002: Violação de restrição única (email ou código da UC já existem)
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'Conflito de dados: O e-mail ou a Unidade Consumidora já estão cadastrados.',
        );
      }
      throw error;
    }
  }

  /**
   * LISTAR SIMULAÇÕES (INDEX)
   * Retorna dados paginados e com suporte a busca.
   */
  async findAll(params: { page: number; perPage: number; search?: string }) {
    const { page, perPage, search } = params;
    const skip = (page - 1) * perPage;

    // Busca os dados e o total simultaneamente para performance
    const [data, total] = await Promise.all([
      this.repository.findAll({ skip, take: perPage, search }),
      this.repository.count(search),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / (perPage || 10)),
      },
    };
  }

  /**
   * MOSTRAR DETALHES COM HISTÓRICO (SHOW)
   * Retorna o lead e um array com outras simulações do mesmo e-mail.
   */
  async findByIdWithHistory(id: string) {
    const lead = await this.repository.findById(id);

    if (!lead) {
      throw new NotFoundException('Simulação não encontrada.');
    }

    // Busca "irmãos" desta simulação (mesmo email, IDs diferentes)
    const history = await this.repository.findByEmail(lead.email, id);

    return {
      ...lead,
      history,
    };
  }
}