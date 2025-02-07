import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Alternative } from 'src/questions/dto/alternatives.entity';
import { User } from 'src/users/dto/users.entity';
import { Repository } from 'typeorm';
import { UserAttempt } from '../dto/user-attempt.entity';
import { UserHistory } from '../dto/user-history.entity';

@Injectable()
export class OperationalService {
  constructor(
    @InjectRepository(UserAttempt)
    private userAttemptRepository: Repository<UserAttempt>,

    @InjectRepository(UserHistory)
    private userHistoryRepository: Repository<UserHistory>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Alternative)
    private alternativeRepository: Repository<Alternative>,
  ) {}

  // Registrar tentativa de um usuário
  async registerUserAttempt(userId: number, questionId: number, alternativeId: number): Promise<void> {
    const alternative = await this.alternativeRepository.findOne({ where: { id: alternativeId } });
    const isCorrect = alternative.correta;

    // Cria o registro de tentativa
    const userAttempt = this.userAttemptRepository.create({
      user: { id: userId },
      question: { id: questionId },
      alternative: { id: alternativeId },
      correta: isCorrect,
      dtTentativa: new Date(),
    });

    await this.userAttemptRepository.save(userAttempt);

    // Atualiza o histórico do usuário
    await this.updateUserHistory(userId);
  }

  // Atualiza o histórico do usuário
  async updateUserHistory(userId: number): Promise<void> {
    const attempts = await this.userAttemptRepository.find({ where: { user: { id: userId } } });
    const correctAttempts = attempts.filter(attempt => attempt.correta).length;
    const totalAttempts = attempts.length;

    const userHistory = await this.userHistoryRepository.findOne({ where: { user: { id: userId } } });

    if (userHistory) {
      userHistory.totalTentativas = totalAttempts;
      userHistory.totalAcertos = correctAttempts;
      userHistory.percentualAcertos = (correctAttempts / totalAttempts) * 100;
      userHistory.dtAtualizacao = new Date();

      await this.userHistoryRepository.save(userHistory);
    } else {
      const newHistory = this.userHistoryRepository.create({
        user: { id: userId },
        totalTentativas: totalAttempts,
        totalAcertos: correctAttempts,
        percentualAcertos: (correctAttempts / totalAttempts) * 100,
        dtAtualizacao: new Date(),
      });

      await this.userHistoryRepository.save(newHistory);
    }
  }

  // Retorna o ranking dos usuários
  async getRanking(): Promise<UserHistory[]> {
    return this.userHistoryRepository.find({
      order: { percentualAcertos: 'DESC' },
      relations: ['user'],
    });
  }

  // Retorna o histórico de tentativas de um usuário
  async getUserHistory(userId: number): Promise<UserHistory> {
    return this.userHistoryRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
