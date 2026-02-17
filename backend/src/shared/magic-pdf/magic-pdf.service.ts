// src/shared/magic-pdf/magic-pdf.service.ts

import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import FormData from 'form-data'; 
import { firstValueFrom } from 'rxjs';
import { MagicPdfResponse } from './interfaces/magic-pdf-response.interface';

@Injectable()
export class MagicPdfService {
  private readonly logger = new Logger(MagicPdfService.name);
  private readonly url = 'https://magic-pdf.solarium.newsun.energy/v1/magic-pdf';

  constructor(private readonly httpService: HttpService) {}

  async decodeBill(file: Express.Multer.File): Promise<MagicPdfResponse> {
    const formData = new FormData();
    
    // O campo deve ser obrigatoriamente "file"
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    try {
      this.logger.log(`Enviando fatura ${file.originalname} para MagicPDF...`);

      const { data } = await firstValueFrom(
        this.httpService.post<MagicPdfResponse>(this.url, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        }),
      );

      return data;
    } catch (error) {
      this.logger.error('Erro ao integrar com MagicPDF API', error.message);
      
      throw new HttpException(
        'Erro ao processar a fatura de energia externa.',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}