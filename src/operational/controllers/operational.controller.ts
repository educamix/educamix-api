import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserHistory } from '../dto/user-history.entity';
import { OperationalService } from '../services/operational.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Operações')	
@Controller('operational')
export class OperationalController {
  constructor(private readonly operationalService: OperationalService) {}

  @Post('register-attempt')
  @ApiOperation({ summary: 'Registra uma tentativa de um usuário' })
  async registerUserAttempt(
    @Body() { userId, questionId, alternativeId }: { userId: number, questionId: number, alternativeId: number }
  ) {
    await this.operationalService.registerUserAttempt(userId, questionId, alternativeId);
    return { message: 'Attempt registered successfully' };
  }

  @Get('ranking')
  @ApiOperation({ summary: 'Retorna o ranking dos usuários' })
  async getRanking(): Promise<UserHistory[]> {
    return this.operationalService.getRanking();
  }

  @Get('history/:userId')
  @ApiOperation({ summary: 'Retorna o histórico de tentativas de um usuário' })
  async getUserHistory(@Param('userId') userId: number): Promise<UserHistory> {
    return this.operationalService.getUserHistory(userId);
  }
}
