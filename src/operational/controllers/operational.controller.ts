import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserHistory } from '../dto/user-history.entity';
import { OperationalService } from '../services/operational.service';

@Controller('operational')
export class OperationalController {
  constructor(private readonly operationalService: OperationalService) {}

  // Registra uma tentativa de um usuário
  @Post('register-attempt')
  async registerUserAttempt(
    @Body() { userId, questionId, alternativeId }: { userId: number, questionId: number, alternativeId: number }
  ) {
    await this.operationalService.registerUserAttempt(userId, questionId, alternativeId);
    return { message: 'Attempt registered successfully' };
  }

  // Retorna o ranking dos usuários
  @Get('ranking')
  async getRanking(): Promise<UserHistory[]> {
    return this.operationalService.getRanking();
  }

  // Retorna o histórico de tentativas de um usuário
  @Get('history/:userId')
  async getUserHistory(@Param('userId') userId: number): Promise<UserHistory> {
    return this.operationalService.getUserHistory(userId);
  }
}
