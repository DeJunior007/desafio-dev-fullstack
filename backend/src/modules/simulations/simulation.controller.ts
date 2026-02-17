import { Controller, Post, Get, Body, Query, Param, UploadedFile, UseInterceptors, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { SimulationsService } from './simulations.service';
import { CreateSimulationDto } from './dto/create-simulation.dto'; 

@ApiTags('simulations') 
@Controller('simulations')
export class SimulationsController {
  constructor(private readonly simulationsService: SimulationsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('files'))
  @ApiOperation({ summary: 'Criar nova simulação com upload de PDF' })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({ type: CreateSimulationDto })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateSimulationDto 
  ) {
    return this.simulationsService.create(file, body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar simulações com paginação e busca' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'perPage', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, description: 'Busca por nome ou email' })
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
    @Query('search') search?: string,
  ) {
    return this.simulationsService.findAll({ page, perPage, search });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar detalhe de uma simulação e histórico' })
  @ApiResponse({ status: 200, description: 'Dados retornados com sucesso.' })
  @ApiResponse({ status: 404, description: 'Simulação não encontrada.' })
  async show(@Param('id') id: string) {
    return this.simulationsService.findByIdWithHistory(id);
  }
}