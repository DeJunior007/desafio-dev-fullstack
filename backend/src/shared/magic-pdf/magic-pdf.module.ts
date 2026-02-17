// src/shared/magic-pdf/magic-pdf.module.ts

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MagicPdfService } from './magic-pdf.service';

@Module({
  imports: [HttpModule],
  providers: [MagicPdfService],
  exports: [MagicPdfService], // Exportamos para ser usado em outros módulos
})
export class MagicPdfModule {}