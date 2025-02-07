import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsController } from './controllers/questions.controller';
import { QuestionsService } from './services/questions.service';
import { Alternative } from './dto/alternatives.entity';
import { Question } from './dto/questions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Alternative])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [TypeOrmModule],  // Expondo o TypeOrmModule para permitir o acesso às entidades Question e Alternative
})
export class QuestionsModule {}
