import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express'; 
import { memoryStorage } from 'multer'; 

import { SimulationsController } from './simulation.controller';
import { SimulationsService } from './simulations.service';
import { PrismaLeadRepository } from './repositories/prisma-lead.repository';
import { MagicPdfModule } from '../../shared/magic-pdf/magic-pdf.module';
import { DatabaseModule } from '../../core/database/database.module'; 

@Module({
  imports: [
    MagicPdfModule, 
    DatabaseModule,
    // CONFIGURAÇÃO DO UPLOAD (Essencial)
    MulterModule.register({
      storage: memoryStorage(), // Isso mantém o PDF na RAM como um Buffer
    }),
  ],
  controllers: [SimulationsController],
  providers: [
    SimulationsService, 
    PrismaLeadRepository 
  ],
})
export class SimulationsModule {}