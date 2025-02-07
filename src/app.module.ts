import { Module } from '@nestjs/common';  // Importação correta do decorador @Module
import { TypeOrmModule } from "@nestjs/typeorm";
import { Alternative } from "./questions/dto/alternatives.entity";
import { Question } from "./questions/dto/questions.entity";
import { User } from "./users/dto/users.entity";
import e from 'express';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,    
      port: 1433,
      username: process.env.DB_USER, 
      password: process.env.DB_PASSWORD,  
      database: process.env.DB_NAME,  
      entities: [User, Question, Alternative],  
      synchronize: true, 
      extra: {
        trustServerCertificate: true,
        encrypt: false,
      }
    }),
  ],
})
export class AppModule {}
