import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaLeadRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Criação completa do Lead com Unidades e Histórico (Nested Write)
  async create(data: Prisma.LeadCreateInput) {
    return this.prisma.lead.create({
      data,
      include: {
        unidades: {
          include: { historicoDeConsumoEmKWH: true },
        },
      },
    });
  }

  // Listagem com Busca e Paginação (Index)
  async findAll(params: { skip: number; take: number; search?: string }) {
    const { skip, take, search } = params;

    const where: Prisma.LeadWhereInput = search
      ? {
          OR: [
            { nomeCompleto: { contains: search } },
            { email: { contains: search } },
            {
              unidades: {
                some: {
                  codigoDaUnidadeConsumidora: { contains: search },
                },
              },
            },
          ],
        }
      : {};

    return this.prisma.lead.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        unidades: {
          include: { historicoDeConsumoEmKWH: true },
        },
      },
    });
  }

  // Contador para controle de páginas no frontend
  async count(search?: string) {
    const where: Prisma.LeadWhereInput = search
      ? {
          OR: [
            { nomeCompleto: { contains: search } },
            { email: { contains: search } },
            {
              unidades: {
                some: {
                  codigoDaUnidadeConsumidora: { contains: search },
                },
              },
            },
          ],
        }
      : {};

    return this.prisma.lead.count({ where });
  }

  // Busca por ID (Show)
  async findById(id: string) {
    return this.prisma.lead.findUnique({
      where: { id },
      include: {
        unidades: {
          include: { historicoDeConsumoEmKWH: true },
        },
      },
    });
  }

  // Busca histórico de outras simulações do mesmo email (Relacionamento de Histórico)
  async findByEmail(email: string, excludeId: string) {
    return this.prisma.lead.findMany({
      where: {
        email,
        id: { not: excludeId },
      },
      select: {
        id: true,
        createdAt: true,
        unidades: {
          select: {
            codigoDaUnidadeConsumidora: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}