import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';  // Importando UsersModule
import { QuestionsModule } from '../questions/questions.module';  // Importando QuestionsModule
import { Alternative } from 'src/questions/dto/alternatives.entity';
import { User } from 'src/users/dto/users.entity';
import { OperationalController } from './controllers/operational.controller';
import { UserAttempt } from './dto/user-attempt.entity';
import { UserHistory } from './dto/user-history.entity';
import { OperationalService } from './services/operational.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAttempt, UserHistory, User, Alternative]),  
    UsersModule,  
    QuestionsModule,  
  ],
  controllers: [OperationalController],
  providers: [OperationalService],
})
export class OperationalModule {}
