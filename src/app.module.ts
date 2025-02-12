import { Module } from '@nestjs/common';  // Importação correta do decorador @Module
import { TypeOrmModule } from "@nestjs/typeorm";
import { Alternative } from "./questions/dto/alternatives.entity";
import { Question } from "./questions/dto/questions.entity";
import { User } from "./users/dto/users.entity";
import { ConfigModule } from '@nestjs/config';
import { Subject } from './questions/dto/subject.entity';
import { Profile } from './users/dto/profile.entity';
import { UserHistory } from './operational/dto/user-history.entity';
import { UserAttempt } from './operational/dto/user-attempt.entity';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { OperationalModule } from './operational/operational.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.SUPABASE_URL,
      entities: [User, Question, Alternative, Subject, Profile, UserHistory, UserAttempt],  
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false, 
        },
      },
    }),
    QuestionsModule,
    UsersModule,
    OperationalModule
  ],
})
export class AppModule {}
