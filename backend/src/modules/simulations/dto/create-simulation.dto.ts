import { ApiProperty } from '@nestjs/swagger';

export class CreateSimulationDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo do solicitante' })
  nomeCompleto: string;

  @ApiProperty({ example: 'joao@email.com', description: 'E-mail para contato' })
  email: string;

  @ApiProperty({ example: '11999999999', description: 'Telefone com DDD' })
  telefone: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Arquivo PDF para processamento' })
  files: any; // O Swagger precisa disso para habilitar o botão de 'Upload'
}