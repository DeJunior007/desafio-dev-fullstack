import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // Vazio para capturar absolutamente TUDO
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Define o status: se for HttpException usa o dele, se não, é 500 (Erro Interno)
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Pega a mensagem de erro original
    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as any).message || exception.message
        : 'Internal server error';

    // Aqui você pode personalizar a mensagem específica do Multer
    let customMessage = message;
    if (typeof message === 'string' && message.includes('Unexpected field')) {
      customMessage = `Erro no Upload: O campo do arquivo deve ser 'file'. Verifique o nome da chave enviada.`;
    }

    // Estrutura padrão de erro da sua API
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: exception instanceof HttpException ? exception.name : 'InternalServerError',
      message: customMessage,
    };

    // Log para você debugar no terminal do VS Code/Pop!_OS
    console.error(`[Error] ${request.method} ${request.url}`, exception);

    response.status(status).json(errorResponse);
  }
}