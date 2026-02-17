import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { SimulationsModule } from './modules/simulations/simulations.module';
import { MagicPdfModule } from './shared/magic-pdf/magic-pdf.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    MagicPdfModule,
    SimulationsModule,
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
