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
      host: process.env.SUPABASE_HOST,
      port: 5432,
      username: process.env.SUPABASE_USER,
      password: process.env.SUPABASE_PASSWORD,
      database: process.env.SUPABASE_DATABASE,
      entities: [User, Question, Alternative, Subject, Profile, UserHistory, UserAttempt],  
      synchronize: true,
      ssl: { rejectUnauthorized: false }, 
    }),
    QuestionsModule,
    UsersModule,
    OperationalModule
  ],
})
export class AppModule {}
