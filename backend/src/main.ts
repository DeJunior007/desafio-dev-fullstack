import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // 1. Importe os módulos
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Desafio Fullstack')
    .setDescription('Documentação detalhada do ecossistema de simulações')
    .setVersion('1.0')
    .addBearerAuth() // Adicione isso se for usar autenticação JWT futuramente
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 2. Rota: http://localhost:3333/api

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3333;
  await app.listen(port, '0.0.0.0');
  
  console.log(`🚀 Backend rodando na porta: ${port}`);
  console.log(`📡 Aceitando requisições de: ${frontendUrl}`);
  console.log(`📑 Documentação disponível em: http://localhost:${port}/api`); // Log útil
}
bootstrap();