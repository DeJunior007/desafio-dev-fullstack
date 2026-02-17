import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { MagicPdfService } from './magic-pdf.service';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('MagicPdfService', () => {
  let service: MagicPdfService;
  let httpService: HttpService;

  // Criamos um mock do arquivo que o Multer receberia
  const mockFile = {
    buffer: Buffer.from('fake-pdf-content'),
    originalname: 'fatura.pdf',
    mimetype: 'application/pdf',
  } as Express.Multer.File;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MagicPdfService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(), // Criamos uma função falsa para o post
          },
        },
      ],
    }).compile();

    service = module.get<MagicPdfService>(MagicPdfService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve decodificar a fatura com sucesso', async () => {
    const mockApiResponse = {
      data: { unit_key: '123', phaseModel: 'monofasico', chargingModel: 'B1', data: [] },
    };

    // Simulamos que o post retorna um "Observable" de sucesso (padrão do Nest HttpService)
    jest.spyOn(httpService, 'post').mockReturnValue(of(mockApiResponse as AxiosResponse));

    const result = await service.decodeBill(mockFile);

    expect(result.unit_key).toBe('123');
    expect(httpService.post).toHaveBeenCalledWith(
      expect.stringContaining('v1/magic-pdf'),
      expect.any(Object), // O FormData
      expect.any(Object), // Os Headers
    );
  });

  it('deve lançar HttpException quando a API externa falhar', async () => {
    // Simulamos um erro de rede ou 500 na API da Solarium
    jest.spyOn(httpService, 'post').mockReturnValue(
      throwError(() => new Error('Internal Server Error'))
    );

    await expect(service.decodeBill(mockFile)).rejects.toThrow(
      new HttpException('Erro ao processar a fatura de energia externa.', HttpStatus.BAD_GATEWAY)
    );
  });
});