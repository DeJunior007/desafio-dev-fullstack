import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { SimulationsService } from './simulations.service';
import { PrismaLeadRepository } from './repositories/prisma-lead.repository';
import { MagicPdfService } from '../../shared/magic-pdf/magic-pdf.service';

describe('SimulationsService', () => {
  let service: SimulationsService;
  let repository: jest.Mocked<PrismaLeadRepository>;
  let magicPdfService: jest.Mocked<MagicPdfService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulationsService,
        {
          provide: PrismaLeadRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            count: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
        {
          provide: MagicPdfService,
          useValue: {
            decodeBill: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SimulationsService>(SimulationsService);
    repository = module.get(PrismaLeadRepository);
    magicPdfService = module.get(MagicPdfService);
  });

  const mockFile = {
    originalname: 'conta.pdf',
  } as Express.Multer.File;

const mockDecoded = {
  invoice: Array.from({ length: 12 }).map((_, i) => ({
    consumo_fp: 100 + i,
    consumo_date: new Date().toISOString(),
  })),
  unit_key: '123456',
  phaseModel: 'monofasico',
  chargingModel: 'B1',
};


  const mockDomain = {
    codigoDaUnidadeConsumidora: '123456',
    modeloFasico: 'monofasico',
    enquadramento: 'B1',
    historicoDeConsumoEmKWH: Array.from({ length: 12 }).map((_, i) => ({
      consumoForaPontaEmKWH: 100 + i,
      mesDoConsumo: new Date(),
    })),
  };


  describe('create', () => {
    it('should throw if file is not provided', async () => {
      await expect(
        service.create(undefined as any, {
          nomeCompleto: 'João',
          email: 'joao@email.com',
          telefone: '11999999999',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should throw if MagicPDF returns invalid data', async () => {
      magicPdfService.decodeBill.mockResolvedValue(null as any);

      await expect(
        service.create(mockFile, {
          nomeCompleto: 'João',
          email: 'joao@email.com',
          telefone: '11999999999',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should create a simulation successfully', async () => {
      magicPdfService.decodeBill.mockResolvedValue(mockDecoded as any);
      repository.create.mockResolvedValue({ id: 'lead-id' } as any);

      const result = await service.create(mockFile, {
        nomeCompleto: 'João',
        email: 'joao@email.com',
        telefone: '11999999999',
      });

      expect(magicPdfService.decodeBill).toHaveBeenCalled();
      expect(repository.create).toHaveBeenCalled();
      expect(result).toEqual({ id: 'lead-id' });
    });

    it('should handle unique constraint error (P2002)', async () => {
      magicPdfService.decodeBill.mockResolvedValue(mockDecoded as any);
      repository.create.mockRejectedValue({ code: 'P2002' });

      await expect(
        service.create(mockFile, {
          nomeCompleto: 'João',
          email: 'duplicado@email.com',
          telefone: '11999999999',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return paginated simulations', async () => {
      repository.findAll.mockResolvedValue([{ id: '1' }] as any);
      repository.count.mockResolvedValue(1);

      const result = await service.findAll({
        page: 1,
        perPage: 10,
      });

      expect(repository.findAll).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        search: undefined,
      });

      expect(result.meta.total).toBe(1);
      expect(result.meta.lastPage).toBe(1);
    });
  });

  describe('findByIdWithHistory', () => {
    it('should throw if simulation not found', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(
        service.findByIdWithHistory('invalid-id'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should return simulation with history', async () => {
      const lead = { id: '1', email: 'test@email.com' };
      const history = [{ id: '2' }];

      repository.findById.mockResolvedValue(lead as any);
      repository.findByEmail.mockResolvedValue(history as any);

      const result = await service.findByIdWithHistory('1');

      expect(result).toEqual({
        ...lead,
        history,
      });
    });
  });
});
